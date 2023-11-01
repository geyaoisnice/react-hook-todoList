import { get, post } from "./request"

export const getHookList = async data => get("/hookList", data)