import { NextRequest, NextResponse } from "next/server";
import {
  readAgreement,
  createAgreement,
  updateAgreement,
  getLastAgreement,
} from "@/app/services/agreement/crud";
import { completeAgreements } from "@/app/business/agreement/logic";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const addAgrement = searchParams.get("add");
    const agreements = addAgrement
      ? await getLastAgreement()
      : await readAgreement();
    completeAgreements(agreements);
    return NextResponse.json(agreements);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const { agreement, agreementID } = await request.json();
    const newInsert = await createAgreement(agreement, agreementID);
    return NextResponse.json(newInsert);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};

export const PUT = async (request) => {
  try {
    const newUpdate = await updateAgreement(await request.json());
    return NextResponse.json(newUpdate);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};
