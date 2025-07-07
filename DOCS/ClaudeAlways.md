# CLAUDE ALWAYS RULES - Studio4 Project

**These rules apply to EVERY session and EVERY task for this project**

---

## **🔥 TRIGGER PHRASE: "docs"**

**When user says "docs" - DO THIS IMMEDIATELY:**

1. **Read ClaudeAlways.md** (this file) to review rules
2. **Read CLAUDE.md** for latest memory and session context
3. **Read ALL PROJECT-DOCS in order** to understand status:
   - `DOCS/PROJECT-DOCS/00-S4-DEV-ROADMAP.md` - Current development roadmap
   - `DOCS/PROJECT-DOCS/01-S4-DEV-LOG.md` - Detailed development log
   - `DOCS/PROJECT-DOCS/02-S4-DEV-UI.md` - Studio4 UI Design System (META theme)
   - Any additional docs in PROJECT-DOCS folder in numbered order
4. **Report current status** and what's ready for next work
5. **CONFIRM which system you're working on**:
   - **Studio4 UI Components** (02-S4-DEV-UI.md) = The theme builder interface itself
   - **S4 Output Theme System** (01-S4-DEV-LOG.md) = Themes users create for websites
6. **Provide summary of planned updates** before implementing anything
7. **Ask for confirmation** before proceeding with work

**User can say "docs" anytime to trigger this workflow**

---

## **RULE 1: ALWAYS UPDATE PROJECT DOCS FIRST**

### **Before any work:**
1. **Update PROJECT-DOCS** with any changes/progress
2. **Update CLAUDE.md memory** with session details  
3. **Give locations** of what was updated

### **MANDATORY Document Locations - NEVER CREATE DOCS ELSEWHERE:**
- **DOCS/PROJECT-DOCS/** - Main project documentation
  - `00-S4-DEV-ROADMAP.md` - ADHD-friendly current status (clean, no legacy)
  - `01-S4-DEV-LOG.md` - Technical session details (every decision)
- **DOCS/** - Memory and learning materials
  - `CLAUDE.md` - Main memory file (session progress)
  - `REACT-LEARNING-GUIDE.md` - Learning materials

### **NEVER CREATE DOCS IN:**
- Plugin folders (studio4/, etc.)
- Random project locations
- New doc files anywhere else
- **ALWAYS USE EXISTING DOCS** in DOCS/ folder only

---

## **RULE 2: ADHD-FRIENDLY ROADMAP**
- **Remove completed items** from roadmap when done
- **Remove pivot/legacy references** - keep current focus only
- **Simple, clear bullets** - no verbose explanations
- **Current status obvious** - what's working now vs. what's next

---

## **RULE 3: TECHNICAL LOG COMPLETENESS**
- **Every decision** recorded in 01-S4-DEV-LOG.md
- **File changes** documented with paths
- **Build results** included
- **User feedback** captured
- **Technical details** comprehensive

---

## **RULE 4: NO DUPLICATION**
- **Single source of truth** - consolidate duplicate info
- **Remove temporary docs** after consolidation
- **Update main docs** instead of creating new ones

---

## **RULE 5: SESSION WORKFLOW**
1. ✅ **Read ClaudeAlways.md** (review rules)
2. ✅ **Read CLAUDE.md** (get memory/context)
3. ✅ **Read current PROJECT-DOCS** to understand status
4. ✅ **Provide summary of planned updates** before implementing
5. ✅ **Get user confirmation** before proceeding
6. ✅ **Complete requested work**
7. ✅ **Update 00-ROADMAP** (remove completed, add new)
8. ✅ **Update 01-DEV-LOG** (technical details)
9. ✅ **Update CLAUDE.md** (session summary)
10. ✅ **State locations** of updated docs

---

## **RULE 6: GIT COMMIT CONTROL**

**NEVER commit to git without explicit user approval:**
1. **Always ask before committing** - show what changes will be committed
2. **Always commit to BOTH** local and GitHub when approved
3. **Use both commands**: `git commit` AND `git push` in sequence
4. **Show git status** before asking for commit approval
5. **User must explicitly say "commit" or "commit and push"**

**Example workflow:**
- "I'm ready to commit these changes to git. Should I commit and push to GitHub?"
- Wait for user approval
- Run: `git commit -m "message"` then `git push`

---

## **RULE 7: TASK MANAGEMENT**

**NEVER start new checklist items without checking first:**
1. **After completing docs updates** - always ask "what's next?" instead of starting next todo
2. **Check with user before** starting any new tasks from todo list
3. **Document requests are breaks** - user just wants to capture progress, not continue development
4. **Wait for explicit direction** on next steps

**Example workflow:**
- Complete documentation updates
- "Documentation updated. What would you like to work on next?"
- Wait for user direction

---

## **RULE 8: UI vs OUTPUT THEME CLARITY**

**🚨 CRITICAL: This is a theme builder that builds themes - TWO separate systems:**

### **Studio4 UI Design System (META)**
- **Documentation**: `02-S4-DEV-UI.md`
- **Purpose**: Style the Studio4 theme builder interface itself
- **Files**: `ui-theme-config.json`, `UIComponents.jsx`, `ThemeEditor.jsx`
- **Components**: Sidebar, buttons, tabs, preview area of the builder
- **Users**: Developers only (hidden from end users)

### **S4 Output Theme System**
- **Documentation**: `01-S4-DEV-LOG.md`
- **Purpose**: Create themes that get exported for user websites
- **Files**: `s4-presets.json`, `S4PresetProcessor.js`
- **Components**: hero, card, sidebar (website components, NOT builder UI)
- **Users**: End users building website themes

**ALWAYS CONFIRM which system before working:**
- "Are we working on the Studio4 UI components (the builder interface)?"
- "Or are we working on the S4 output theme system (what users create)?"

---

**Remember: Always follow this workflow - Documentation first, then coding, commit only when asked**