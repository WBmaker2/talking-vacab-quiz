# Deployment Policy

## Canonical Deployment Target

This project uses **Vercel** as the default and preferred deployment platform.

- Deploy changes to Vercel after code updates.
- Treat the Vercel deployment as the primary live environment.
- Do not add alternate deployment-specific routing or asset path workarounds unless requirements change explicitly.

## Git Workflow

For normal project updates, use this order:

1. Make the code change
2. Run the relevant local check such as `npm run build`
3. Commit the change to Git
4. Push to the remote repository
5. Deploy to Vercel

## Vercel-First Rule

When implementing or refactoring:

- Prefer Vercel-compatible static deployment behavior
- Do not add host-specific redirects, alternate static output folders, or legacy multi-target deployment workarounds for new changes
- If deployment assumptions conflict, choose the Vercel-friendly option

## Change in Policy

Only change this policy if the project owner explicitly decides to switch away from Vercel or support multiple deployment targets.
