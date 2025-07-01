# 01 - ALWAYS RULES

**Minimal AI Assistant Guidelines**

---

## 🎯 **CORE ALWAYS RULES**

### **📚 Documentation Review**
- **Always read documents in order** (02, 03, 04, etc., CLAUDE.md) before starting work
- **Always maintain single source of truth** - Update only the authoritative document
- **Always get approval and show planned edits** before editing documents

### **🎨 Styling Check**
- **Always reference STYLING-SYSTEM document** before modifying styling or CSS

### **🔄 Git Operations**
- **Always run these commands before commits:**
  - `git status` (see untracked files)
  - `git diff` (see staged and unstaged changes)  
  - `git log` (understand recent commit style)
- **Always add untracked files and sync with GitHub:**
  - `git pull origin main` before changes
  - `git push origin main` after commit
- **Always use commit format:**
  ```
  type: descriptive commit message
  
  🤖 Generated with [Claude Code](https://claude.ai/code)
  
  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

### **💾 Backup System**
- **Always backup before document updates:**
  - Create full backup of DOCS folder in VERSION-CONTROL
  - Name with timestamp: DOCS-BACKUP-YYYY-MM-DD-HHMMSS
  - Keep last 10 versions, purge older ones
  - Trigger on any PROJECT-DOCS-V2 or PROJECT-CONTENT-V2 edits
  - Trigger on "checkpoint" command
- **Always backup full WordPress site:**
  - Database backup
  - Full site files
  - Keep GitHub and local in sync

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
  - **03-STYLING-SYSTEM.md** - If styling/CSS work was completed
  - **01-PROJECT-ARCHITECTURE.md** - If new features, architecture changes, or vision updates
  - **02-TECHNICAL-SETUP.md** - If setup, build system, or integration changes
  - **04-AGENT-RULES.md** - If new rules, processes, or workflows were established
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
1. **Review CLAUDE.md** for recent context and decisions
2. **Check 01-PROJECT-ARCHITECTURE.md** for project overview and vision
3. **Reference 03-STYLING-SYSTEM.md** for styling guidance
4. **Check 02-TECHNICAL-SETUP.md** for development setup if needed

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

### **Primary Documentation (STUDIO-DOCS-V2)**
- **`CLAUDE.md`** - Session memory and development context
- **`01-PROJECT-ARCHITECTURE.md`** - Project vision, core architecture, user workflows
- **`02-TECHNICAL-SETUP.md`** - Development setup, build system, WordPress integration
- **`03-STYLING-SYSTEM.md`** - Universal Scoped Component System (Single Source of Truth)
- **`04-AGENT-RULES.md`** - This document: AI assistant guidelines

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