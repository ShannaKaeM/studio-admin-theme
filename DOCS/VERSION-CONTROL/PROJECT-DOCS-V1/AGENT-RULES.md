# AGENT RULES - The Studio WordPress Plugin

**Always Rules & Project Management Guidelines for AI Assistants**

**Date Created**: December 30, 2024  
**Project**: The Studio - WordPress Design System Plugin  
**Purpose**: Maintain consistency and quality across all AI assistant interactions

---

## 🎯 **CORE ALWAYS RULES**

### **📚 Documentation & Memory Management**
- **Always update CLAUDE.md** memory after completing logical task groups **BUT do not commit unless user initiates checkpoint**
- **Always maintain single source of truth** - Update only the authoritative document for each topic
- **Always follow documentation hierarchy** - STYLING-RULES.md for styling, README.md for features, etc.
- **Always reference rather than duplicate** - Point to master documents instead of copying information
- **Always request approval** before creating, moving, or renaming files
- **Always use TodoWrite/TodoRead** tools frequently for task tracking and visibility
- **Always mark todos as completed** immediately after finishing (don't batch completions)
- **Always provide specific file paths** when referencing code locations
- **Checkpoints only when triggered** - User must say "checkpoint" or similar to initiate formal documentation updates and commits

### **💻 Code Quality & Standards**
- **Always prefer editing existing files** over creating new ones
- **Always follow existing code conventions** and patterns in the codebase
- **Always check for existing libraries** before assuming availability (check package.json, imports)
- **Always follow security best practices** (never expose secrets, sanitize input)
- **Always remove unused code** rather than commenting it out
- **Always use absolute file paths** in tools (not relative paths)

### **🎨 Styling & CSS Architecture**
- **Always reference DOCS/STUDIO-STYLING/STYLING-RULES.md** for complete V2 styling guidelines (Single Source of Truth)
- **Always follow Universal Scoped Component System** with 4-tier hierarchy
- **Always use scoped classes**: `.card.projects.dashboard` (NEVER `.studio-*` prefixes)
- **Always use semantic CSS variables**: `var(--studio-bg-card)` (NEVER hardcoded values)
- **Always follow progressive enhancement scoping**: Universal base → Page scope → Helper scope
- **Plugin implementation** uses V2 system in `src/styles/global.css`

### **🔄 Git & Commit Operations**
- **Always run parallel git commands** before committing:
  - `git status` (see untracked files)
  - `git diff` (see staged and unstaged changes)  
  - `git log` (understand recent commit style)
- **Always add relevant untracked files** to staging area
- **Always create commits** with proper message format:
  ```
  type: descriptive commit message
  
  🤖 Generated with [Claude Code](https://claude.ai/code)
  
  Co-Authored-By: Claude <noreply@anthropic.com>
  ```
- **Never update git config**
- **Never use interactive git commands** (-i flags not supported)
- **Never push to remote** unless explicitly requested

### **🗣️ Communication & Response Style**
- **Always be concise** (fewer than 4 lines unless detail requested)
- **Always answer directly** without unnecessary preamble/postamble
- **Always minimize output tokens** while maintaining quality and accuracy
- **Always batch tool calls** when multiple independent pieces are needed
- **Always use professional, helpful tone** without being verbose

### **🔌 WordPress & Plugin Development**
- **Always enqueue assets conditionally** (only on pages that need them)
- **Always check user permissions** and capabilities (`manage_options`)
- **Always sanitize input** and verify nonces for security
- **Always follow WordPress coding standards** and best practices
- **Always test in both admin and fullscreen modes**

---

## 🚀 **SIMPLE CHECKPOINT COMMANDS**

### **Automatic Checkpoint Trigger**
When the user says **"checkpoint"**, automatically execute the full PROJECT CHECKPOINT CHECKLIST below without asking additional questions.

### **Checkpoint Variations**
- **"checkpoint"** - Full automatic checklist
- **"quick checkpoint"** - Skip build testing and final verification  
- **"checkpoint + commit"** - Include git commit with descriptive message
- **"docs checkpoint"** - Only update documentation files

### **Automatic Process**
1. ✅ **Execute checklist** silently and efficiently
2. ✅ **Update all relevant docs** based on session context
3. ✅ **Include session progress** in commit message
4. ✅ **Report completion** with summary of actions taken

### **Important Distinction**
- **During Work**: Update CLAUDE.md memory as we go, but NO commits or formal checkpoints
- **User-Initiated Only**: Checkpoints (including commits) happen ONLY when user says "checkpoint"
- **Ongoing vs Formal**: Memory updates are ongoing, commits are user-triggered

---

## 📋 **PROJECT CHECKPOINT CHECKLIST**

When creating a project checkpoint or completing major milestones, **always complete this checklist**:

### **🔍 Pre-Checkpoint Review**
- [ ] **Test current functionality** - Verify everything works as expected
- [ ] **Review recent changes** - Ensure all modifications are intentional and complete
- [ ] **Check for incomplete tasks** - Review TodoRead for any pending items

### **📝 Documentation Updates (Single Source of Truth Hierarchy)**
- [ ] **Update CLAUDE.md** - Add all completed work, decisions made, and current status since last commit
- [ ] **Update master documentation** - Based on work completed, following hierarchy:
  - **STYLING-RULES.md** - If styling/CSS work was completed
  - **README.md** - If new features, setup changes, or architecture was added
  - **AGENT-RULES.md** - If new rules, processes, or workflows were established
  - **Technical docs** - If specific system components were modified
- [ ] **Maintain single source of truth** - Update only the authoritative document for each topic
- [ ] **Avoid duplication** - Reference master docs rather than duplicating information

### **🔄 Version Control**
- [ ] **Run build process** - Ensure `npm run build` completes successfully  
- [ ] **Test final state** - Verify plugin works in both admin and fullscreen modes
- [ ] **Git status check** - Review all changed and untracked files
- [ ] **Commit to version control** - Include all relevant files (code, docs, configs)
- [ ] **Ask about database backup** - Check if WordPress database state should be preserved

### **✅ Final Verification**
- [ ] **Verify all links work** - Check documentation cross-references
- [ ] **Confirm file structure** - Ensure organization follows project standards
- [ ] **Test plugin activation** - Deactivate/reactivate to verify clean state
- [ ] **Check access methods** - Test both `/wp-admin` and `/studio/` URLs

---

## 🛠️ **DEVELOPMENT WORKFLOW STANDARDS**

### **Starting New Work**
1. **Read TodoRead** to understand current state
2. **Review CLAUDE.md** for recent context and decisions
3. **Check DOCS/README.md** for project overview and setup
4. **Reference STUDIO-DOCS/STUDIO-STYLING/STYLING-RULES.md** for styling guidance

### **During Development**
1. **Use TodoWrite** to track progress on complex tasks
2. **Follow existing code patterns** and architecture
3. **Test changes incrementally** rather than making large modifications
4. **Update todos in real-time** as work progresses

### **Completing Work**
1. **Mark all todos as completed** 
2. **Test final functionality** thoroughly
3. **Run checkpoint checklist** for significant changes
4. **Update documentation** as needed

---

## 🎯 **QUALITY ASSURANCE**

### **Code Standards**
- **TypeScript**: Strict typing for all new components
- **React**: Functional components with hooks
- **CSS**: Component-specific variables following semantic naming
- **WordPress**: Follow WordPress coding standards and security practices

### **Testing Requirements**
- **Manual Testing**: Both admin and fullscreen modes
- **Build Testing**: Verify `npm run build` succeeds  
- **Activation Testing**: Plugin activate/deactivate cycles
- **Permission Testing**: Verify `manage_options` capability checks

### **Documentation Standards**
- **Clear file paths** for all references
- **Up-to-date examples** that reflect current implementation
- **Cross-references** between related documents
- **Version information** on significant updates

---

## 📁 **KEY FILE REFERENCES**

### **Primary Documentation**
- **`DOCS/CLAUDE.md`** - Session memory and development context
- **`DOCS/README.md`** - Project overview and setup guide
- **`DOCS/STUDIO-STYLING/STYLING-RULES.md`** - Complete V2 styling guidelines (Single Source of Truth)
- **`DOCS/STUDIO-ARCHITECTURE.md`** - Comprehensive plugin development roadmap

### **Plugin Core Files**
- **`app/public/wp-content/plugins/the-studio/the-studio.php`** - Main plugin file
- **`app/public/wp-content/plugins/the-studio/src/styles/global.css`** - CSS implementation
- **`app/public/wp-content/plugins/the-studio/package.json`** - Dependencies and scripts

### **Development Commands**
```bash
# Navigate to plugin directory
cd "app/public/wp-content/plugins/the-studio"

# Development with hot reload
npm run dev

# Production build
npm run build

# Type checking
npm run type-check
```

---

## 🚀 **SUCCESS METRICS**

### **Code Quality Indicators**
- ✅ All builds complete without errors
- ✅ TypeScript compilation passes
- ✅ Plugin activates/deactivates cleanly
- ✅ Both access modes function properly

### **Documentation Quality Indicators**  
- ✅ All file references are accurate
- ✅ Setup instructions work for fresh installations
- ✅ Cross-references between documents function
- ✅ Recent changes are captured in memory

### **Project Health Indicators**
- ✅ Todo list is current and accurate
- ✅ Git history shows clean, descriptive commits
- ✅ Styling follows established guidelines
- ✅ Security best practices are maintained

---

**🎯 These rules ensure consistent, high-quality development and maintenance of The Studio WordPress plugin across all AI assistant interactions.**

*Last Updated: December 30, 2024 - Keep this document synchronized with actual AI assistant capabilities and project requirements.*