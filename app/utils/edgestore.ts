"use client"
import { type TEdgeStoreRouter } from "../api/edgestore/[...edgestore]/route"
import { createEdgeStoreProvider } from "@edgestore/react"

export const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<TEdgeStoreRouter>()
