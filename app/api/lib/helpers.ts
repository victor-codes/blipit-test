import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Validates request body against a Zod schema and returns an error response if validation fails.
 * @param schema The Zod schema to validate against.
 * @param body The request body to validate (typically from req.json()).
 * @returns NextResponse with error details if validation fails, otherwise void.
 */

export const serverValidationBlock = (schema: z.ZodTypeAny, body: unknown) => {
  const parsedData = schema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      {
        message: "Invalid input data",
        details: parsedData.error.format(),
      },
      {
        status: 400,
      }
    );
  }

  return parsedData.data;
};
