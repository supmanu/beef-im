---
paths: app/api/**/*.ts
---

# API Route Patterns

**This rule only applies to files matching: `app/api/**/*.ts`**

## Error Handling
All API routes must use try-catch:

```typescript
export async function GET(request: Request) {
  try {
    // logic here
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
```

## Authentication
Check auth before processing:

```typescript
const session = await getServerSession()
if (!session) {
  return new Response('Unauthorized', { status: 401 })
}
```
