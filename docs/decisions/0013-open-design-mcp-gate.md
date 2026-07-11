# 0013 Open Design MCP Gate

Date: 2026-07-11

## Status

Accepted

## Context

Open Design is the visual source of truth for imported screens and artifacts.
Applying an artifact without its MCP connection can lose design context and
cause agents to guess at tokens, layout, states, or responsive behavior.

## Decision

Tasks that pull design context from Open Design or apply an Open Design artifact
must use the Open Design MCP connection. Check connection availability before
starting design-dependent work. If the connection is unavailable or
disconnected, cancel the task and report the missing connection. Do not
continue with guessed values, partial artifact context, or an alternative
source.

## Consequences

Positive:

- Imported UI keeps Open Design context as its source of truth.
- Missing design dependencies fail clearly instead of producing speculative UI.
- Design application work becomes reproducible through the MCP boundary.

Tradeoffs:

- Design-dependent tasks cannot proceed while Open Design MCP is unavailable.
- Agents must verify connection status before implementation.

## Follow-Up

- Keep Open Design MCP availability visible through the project tool registry.
- Record connection failures in the Harness trace and final task report.
