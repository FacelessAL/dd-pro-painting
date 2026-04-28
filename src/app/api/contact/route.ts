import { NextRequest, NextResponse } from "next/server";

const GHL_BASE_URL = "https://services.leadconnectorhq.com";

function getConfig() {
  const apiKey = (process.env.GHL_API_KEY || "").trim();
  const locationId = (process.env.GHL_LOCATION_ID || "").trim();
  return { apiKey, locationId };
}

function getHeaders() {
  const { apiKey } = getConfig();
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Version: "2021-07-28",
  };
}

interface CustomField {
  id: string;
  name: string;
}

async function getCustomFieldIds(): Promise<Record<string, string>> {
  try {
    const { locationId } = getConfig();
    const res = await fetch(
      `${GHL_BASE_URL}/locations/${locationId}/customFields`,
      { headers: getHeaders() }
    );

    if (!res.ok) {
      console.error("Failed to fetch custom fields:", res.status, await res.text());
      return {};
    }

    const data = await res.json();
    const fields: CustomField[] = data.customFields || [];

    const fieldMap: Record<string, string> = {};
    for (const field of fields) {
      const normalizedName = field.name.toLowerCase().trim();
      fieldMap[normalizedName] = field.id;
    }

    console.log("Custom field map keys:", Object.keys(fieldMap));
    return fieldMap;
  } catch (err) {
    console.error("Error fetching custom fields:", err);
    return {};
  }
}

export async function POST(request: NextRequest) {
  try {
    const { apiKey, locationId } = getConfig();

    if (!apiKey || !locationId) {
      console.error("Missing GHL env vars. API key length:", apiKey.length, "Location ID length:", locationId.length);
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, phone, address, service, message } = body;

    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Split name into first and last
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Fetch custom field IDs from GHL (linked by ID, not name)
    const customFieldMap = await getCustomFieldIds();

    // Build custom fields array using IDs
    const customFields: { id: string; field_value: string }[] = [];

    // Try multiple possible field names for each form field
    const serviceFieldId =
      customFieldMap["service"] ||
      customFieldMap["service needed"] ||
      customFieldMap["service_needed"];
    if (service && serviceFieldId) {
      customFields.push({ id: serviceFieldId, field_value: service });
    }

    const addressFieldId =
      customFieldMap["address"] ||
      customFieldMap["property address"] ||
      customFieldMap["property_address"];
    if (address && addressFieldId) {
      customFields.push({ id: addressFieldId, field_value: address });
    }

    const messageFieldId =
      customFieldMap["message"] ||
      customFieldMap["project details"] ||
      customFieldMap["project_details"];
    if (message && messageFieldId) {
      customFields.push({ id: messageFieldId, field_value: message });
    }

    // Create contact in GHL
    const contactPayload: Record<string, unknown> = {
      locationId,
      firstName,
      lastName,
      email,
      phone,
      address1: address || undefined,
      source: "Website - Free Estimate Form",
      tags: ["website-lead", "free-estimate"],
    };

    if (customFields.length > 0) {
      contactPayload.customFields = customFields;
    }

    console.log("Creating GHL contact for:", email);

    const contactRes = await fetch(`${GHL_BASE_URL}/contacts/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(contactPayload),
    });

    const responseText = await contactRes.text();

    if (!contactRes.ok) {
      console.error("GHL create failed:", contactRes.status, responseText);

      // If contact already exists (duplicate), try upsert
      if (contactRes.status === 422 || contactRes.status === 400) {
        console.log("Attempting upsert for existing contact...");

        // Use the upsert endpoint instead
        const upsertPayload = {
          ...contactPayload,
          locationId,
        };

        const upsertRes = await fetch(`${GHL_BASE_URL}/contacts/upsert`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(upsertPayload),
        });

        if (upsertRes.ok) {
          console.log("GHL upsert succeeded");
          return NextResponse.json({ success: true, upserted: true });
        }

        const upsertError = await upsertRes.text();
        console.error("GHL upsert also failed:", upsertRes.status, upsertError);

        // Last resort: search and update
        try {
          const searchRes = await fetch(
            `${GHL_BASE_URL}/contacts/search/duplicate?locationId=${locationId}&email=${encodeURIComponent(email)}`,
            { headers: getHeaders() }
          );

          if (searchRes.ok) {
            const searchData = await searchRes.json();
            const existingContact = searchData.contact;

            if (existingContact?.id) {
              const updateRes = await fetch(
                `${GHL_BASE_URL}/contacts/${existingContact.id}`,
                {
                  method: "PUT",
                  headers: getHeaders(),
                  body: JSON.stringify({
                    firstName,
                    lastName,
                    phone,
                    address1: address || undefined,
                    tags: ["website-lead", "free-estimate"],
                    customFields:
                      customFields.length > 0 ? customFields : undefined,
                  }),
                }
              );

              if (updateRes.ok) {
                console.log("GHL update succeeded for existing contact");
                return NextResponse.json({ success: true, updated: true });
              }
              console.error("GHL update failed:", await updateRes.text());
            }
          }
        } catch (searchErr) {
          console.error("Search/update fallback failed:", searchErr);
        }

        return NextResponse.json(
          { error: "Failed to save contact. Please call us directly." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Failed to create contact" },
        { status: 500 }
      );
    }

    console.log("GHL contact created successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
