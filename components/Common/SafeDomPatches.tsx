"use client"

import { useEffect } from 'react'

export default function SafeDomPatches() {
  useEffect(() => {
    const orig = (Node.prototype.insertBefore as unknown) as (...args: any[]) => any
    ;(Node.prototype as any).insertBefore = function (newNode: Node, referenceNode: Node | null) {
      try {
        if (referenceNode && referenceNode.parentNode !== this) {
          // Log details to console for debugging but avoid throwing
          // eslint-disable-next-line no-console
          console.warn('SafeDomPatches: referenceNode is not a child; appending instead', {
            parent: this && (this as any).nodeName, newNode: newNode && (newNode as any).nodeName, referenceNode: referenceNode && (referenceNode as any).nodeName, stack: new Error().stack
          })
          try { return (this as any).appendChild(newNode) } catch (err) { return orig.call(this, newNode, null) }
        }
        return orig.call(this, newNode, referenceNode)
      } catch (e) {
        // Final fallback: append and avoid crashing the page
        // eslint-disable-next-line no-console
        console.error('SafeDomPatches: insertBefore failed, appending as fallback', e)
        try { return (this as any).appendChild(newNode) } catch (err) { throw e }
      }
    }

    return () => { (Node.prototype as any).insertBefore = orig }
  }, [])

  return null
}
