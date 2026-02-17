/* eslint-disable no-restricted-imports */
import {
  mutation as rawMutation,
  internalMutation as rawInternalMutation,
} from "../_generated/server";
/* eslint-enable no-restricted-imports */
import { customCtx, customMutation } from "convex-helpers/server/customFunctions";
import { DataModel } from "../_generated/dataModel";
import { Triggers } from "convex-helpers/server/triggers";

/**
 * Single Triggers instance for the app. Table files register handlers with
 * `triggers.register(tableName, handler)`. Mutations must use the wrapped
 * `mutation` / `internalMutation` below so that ctx.db runs trigger logic.
 */
export const triggers = new Triggers<DataModel>();

export const mutation = customMutation(
  rawMutation,
  customCtx(triggers.wrapDB)
);

export const internalMutation = customMutation(
  rawInternalMutation,
  customCtx(triggers.wrapDB)
);
