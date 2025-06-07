import React, { useRef, useState } from "react";

// PUBLIC_INTERFACE
/**
 * ChatPage - AI-powered travel chatbot interface
 * Presents a simple chat UI; user submits travel questions and gets mock AI answers (stubbed API).
 */
function ChatPage() {
  const [messages, setMessages] = useState([
    {sender:'ai', text:"👋 Hi! I'm TravelGenie, your AI travel assistant. How can I help with your trip today?"}
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // PUBLIC_INTERFACE
  /** Handles sending message & AI reply (mock) */
  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = {sender:"user", text:input.trim()};
    setMessages(prev => ([...prev, userMsg]));
    setInput(""); setLoading(true);
    // Simulate async AI response with variable time & slightly different random reply
    setTimeout(() => {
      // Simple canned replies depending on detected intent (mock logic)
      const txt = userMsg.text.toLowerCase(), aiMsgs=[], cityQ = txt.match(/weather.*in (\w+)/);
      if (txt.includes("itinerary") || txt.includes("plan") || txt.includes("suggest")) 
        aiMsgs.push({sender:"ai",text:"I'd be happy to craft a suggested itinerary! Where are you headed, and for how many days?"});
      else if (txt.includes("visa")) aiMsgs.push({sender:"ai",text:"Visa requirements depend on your nationality and destination. Provide those details, and I'll help!"});
      else if (txt.includes("budget")) aiMsgs.push({sender:"ai",text:"Budgeting tip: Set aside at least 30% for accommodation, 30% for meals, and some for local experiences."});
      else if (cityQ)
        aiMsgs.push({sender:"ai", text:`For weather in ${cityQ[1]}, use the Weather Checker page for forecast details!`});
      else if (txt.includes("hello") || txt.includes("hi") || txt.includes("hey"))
        aiMsgs.push({sender:"ai", text:"Hello traveler! How may I assist with your adventure?"});
      else {
        aiMsgs.push({sender:"ai", text:"Great question! Let me think... (As a demo, try asking about weather, itinerary, or visa help!)"});
      }
      setMessages(prev => ([...prev, ...aiMsgs]));
      setLoading(false);
      setTimeout(()=>chatEndRef.current?.scrollIntoView({behavior:"smooth"}), 100);
    }, 900 + Math.floor(Math.random()*700));
  }

  return (
    <div className="container" style={{
      paddingTop:"84px",maxWidth:"520px", display:'flex',flexDirection:'column',minHeight:'76vh'
    }}>
      <h1 className="title" style={{fontSize:"2.1rem",marginBottom: "13px"}}>Travel Chatbot</h1>
      <div className="description" style={{marginBottom:"17px"}}>Ask our AI anything about travel destinations, plans, weather, or advice.</div>
      <div style={{
        background:"rgba(216,239,255,0.10)",
        border:"1px solid var(--border-color)",
        borderRadius:"13px",
        padding:"18px",
        minHeight:"240px",
        marginBottom:"18px",
        maxHeight:"330px",
        overflowY:"auto",
        fontSize:"1.04rem"
      }}>
        {messages.map((m,i)=>(
          <div key={i}
               style={{
                 marginBottom:"13px",
                 display:"flex",
                 justifyContent: m.sender==="user"?"flex-end":"flex-start"
               }}>
            <div style={{
              background: m.sender==="ai"? "var(--base-light)" : "#6f9ddb",
              color: m.sender==="ai"? "var(--base-dark)" : "white",
              borderRadius:"14px",
              padding:"9px 15px",
              maxWidth:"82%",
              fontWeight: m.sender==="ai"?600:500,
              boxShadow: m.sender==="ai" ? "0 2px 6px 0 rgba(0,220,255,0.10)" : "none"
            }}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <form style={{display:"flex",gap:8,marginTop:"auto"}} onSubmit={handleSend} autoComplete="off">
        <input
          style={{flex: 1,padding:"12px",borderRadius:"8px",fontSize:"1rem",border:"1px solid var(--border-color)"}}
          type="text"
          value={input}
          autoFocus
          placeholder={loading ? "" : "Type your message..."}
          disabled={loading}
          onChange={e=>setInput(e.target.value)}
        />
        <button className="btn" type="submit" style={{minWidth:90}} disabled={loading || !input.trim()}>
          {loading?"Thinking...":"Send"}
        </button>
      </form>
    </div>
  );
}

export default ChatPage;
