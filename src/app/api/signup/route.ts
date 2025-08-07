// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { getDbByRole } from "@/lib/mongo";

// Generate a unique 6-digit KiranaID
function generateKiranaID(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, mobileNumber, role, dob } = body;

    const db = await getDbByRole(role);
    const collection = db.collection("signups");

    // Check for duplicate mobile number
    const existingUser = await collection.findOne({ mobileNumber });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Mobile number already registered." },
        { status: 409 }
      );
    }

    // Generate a unique KiranaID
    let kiranaID = generateKiranaID();
    while (await collection.findOne({ kiranaID })) {
      kiranaID = generateKiranaID();
    }

    // Insert new signup document
    const result = await collection.insertOne({
      name,
      mobileNumber,
      role,
      dob: new Date(dob),
      kiranaID,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      kiranaID, // shown only once to user
    });
  } catch (error) {
    console.error("[Signup Error]", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
