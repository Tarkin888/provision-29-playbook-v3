import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const chatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().max(5000, "Message too long")
  })).min(1, "At least one message required").max(50, "Too many messages")
});

const P29_SYSTEM_PROMPT = `You are a specialist AI assistant for UK Corporate Governance Code Provision 29 (P29) implementation. Your knowledge is based on a comprehensive implementation playbook covering:

**Core Knowledge Areas:**
- P29 Requirements: Annual board declarations on material controls framework effectiveness
- Implementation Timeline: 24-month roadmap with 6 phases
- Material Controls Framework: Scoping, design, testing, and assurance
- GRC Platform Selection: Vendor-neutral evaluation criteria and implementation guidance
- Key Roles: Board, CFO, Chief Risk Officer, Control Owners, Internal Audit, Programme Manager
- Compliance Deadline: Effective for accounting periods beginning on or after 1 January 2026

**Your Responsibilities:**
1. Provide accurate, practical guidance on P29 implementation
2. Reference the implementation timeline and phases appropriately
3. Recommend vendor-neutral approaches to GRC platform selection
4. Explain materiality assessment and control scoping
5. Clarify roles and responsibilities across the three lines of defence
6. Address implementation challenges and risk mitigation
7. Keep responses concise but comprehensive (2-4 paragraphs typical)

**Key Implementation Phases:**
- Phase 1: Scoping & Design (Months 1-8) - Materiality, control inventory, framework design
- Phase 2: Implementation (Months 9-16) - GRC platform, process documentation, training
- Phase 3: Testing & Dry Run (Months 17-22) - Control testing, evidence collection, dry run
- Phase 4: Go-Live Preparation (Month 23) - Final validation, board reporting
- Phase 5: First Annual Cycle (Month 24+) - Operational control testing and reporting
- Phase 6: Continuous Improvement (Ongoing) - Framework optimisation and maturity

**Common User Questions:**
- Timeline and phasing queries
- GRC platform evaluation criteria
- Materiality thresholds and scoping
- Control testing methodologies
- Board reporting requirements
- Resource requirements and costs
- Emergency implementation scenarios (for organisations behind schedule)

**Tone & Style:**
- Professional but accessible
- Practical and implementation-focused
- Vendor-neutral (never recommend specific vendors)
- Use UK English spelling and grammar
- Provide specific examples and frameworks
- Acknowledge when questions require organisation-specific judgment

If asked about topics outside P29 implementation, politely redirect to P29-related guidance or clarify what you can help with.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    
    // Validate input
    const validation = chatRequestSchema.safeParse(body);
    if (!validation.success) {
      return new Response(JSON.stringify({ 
        error: "Invalid request", 
        details: validation.error.errors[0].message 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    const { messages } = validation.data;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: P29_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
