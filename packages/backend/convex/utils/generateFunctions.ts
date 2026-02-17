import type { MutationBuilder } from "convex/server";
import { GenericValidator, v } from "convex/values";
import { DataModel } from "../_generated/dataModel";
import { mutation, query } from "../_generated/server";

export type GenerateFunctionsOptions = {
  /** Use a wrapped mutation (e.g. with triggers) so insert/patch/replace/delete run trigger logic. */
  mutation?: MutationBuilder<DataModel, "public">;
};

/** Build a partial schema (all fields optional) from a document schema for use with patch. */
export function makePartialSchema<Schema extends Record<string, GenericValidator>>(
  documentSchema: Schema
): { [K in keyof Schema]: GenericValidator } {
  return Object.fromEntries(
    Object.entries(documentSchema).map(([key, validator]) => [
      key,
      v.optional(validator as GenericValidator),
    ])
  ) as { [K in keyof Schema]: GenericValidator };
}

export function generateFunctions<
  TableName extends keyof DataModel,
  DocumentSchema extends Record<string, GenericValidator>,
  PartialSchema extends Record<string, GenericValidator>,
>(
  table: TableName,
  documentSchema: DocumentSchema,
  partialSchema: PartialSchema,
  options?: GenerateFunctionsOptions
) {
  const doc = v.object(documentSchema);
  const partialDoc = v.object(partialSchema);
  const mut = options?.mutation ?? mutation;

  const get = query({
    args: { id: v.id(table) },
    handler: async (ctx, args) => {
      return await ctx.db.get(args.id);
    },
  });

  const insert = mut({
    args: doc,
    handler: async (ctx, args) => {
      return await ctx.db.insert(table, args);
    },
  });

  const patch = mut({
    args: {
      id: v.id(table),
      data: partialDoc,
    },
    handler: async (ctx, args) => {
      return await ctx.db.patch(args.id, args.data);
    },
  });

  const replace = mut({
    args: {
      id: v.id(table),
      data: doc,
    },
    handler: async (ctx, args) => {
      return await ctx.db.replace(args.id, args.data);
    },
  });

  const del = mut({
    args: { id: v.id(table) },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
      return null;
    },
  });

  return {
    get,
    insert,
    patch,
    replace,
    delete: del,
  };
}
