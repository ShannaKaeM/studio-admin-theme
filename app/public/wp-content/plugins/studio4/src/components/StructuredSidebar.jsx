import React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarHeaderContent,
  SidebarLogo,
  SidebarHeaderText,
  SidebarTitle,
  SidebarSubtitle,
  SidebarContent,
  SidebarSection,
  SidebarFooter,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  ButtonPrimary,
  ButtonSecondary
} from './UIComponents.jsx';
import { useAccordion } from '../hooks/useAccordion.js';

/**
 * Example of a complete structured sidebar using all the UI components
 * This demonstrates how to compose the sidebar with header, content, and footer
 */
export function StructuredSidebar({ 
  logo = 'S4',
  title = 'Studio4',
  subtitle = 'Visual Theme Builder',
  tabs = ['Theme', 'Components', 'Inspector'],
  activeTab = 'Theme',
  onTabChange = () => {},
  sections = [],
  footerActions = []
}) {
  // Use accordion hook to manage accordion state
  const accordion = useAccordion(false, ['colors']); // Single open, colors open by default

  return (
    <Sidebar className="flex flex-col h-full">
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarHeaderContent>
          <SidebarLogo>{logo}</SidebarLogo>
          <SidebarHeaderText>
            <SidebarTitle>{title}</SidebarTitle>
            <SidebarSubtitle>{subtitle}</SidebarSubtitle>
          </SidebarHeaderText>
        </SidebarHeaderContent>
      </SidebarHeader>

      {/* Note: Tab navigation has been deprecated in favor of 4-square navigation grid */}

      {/* Sidebar Content with Accordion */}
      <SidebarContent>
        <Accordion>
          {sections.map(section => (
            <AccordionItem key={section.id}>
              <AccordionTrigger
                isOpen={accordion.isOpen(section.id)}
                onClick={() => accordion.toggleItem(section.id)}
              >
                <div className="flex items-center">
                  <AccordionIcon>
                    {section.icon || section.label.charAt(0)}
                  </AccordionIcon>
                  <span>{section.label}</span>
                </div>
                <svg 
                  className={`w-4 h-4 transition-transform ${
                    accordion.isOpen(section.id) ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </AccordionTrigger>
              <AccordionContent isOpen={accordion.isOpen(section.id)}>
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        {footerActions.map((action, index) => {
          const Component = action.primary ? ButtonPrimary : ButtonSecondary;
          return (
            <Component
              key={index}
              onClick={action.onClick}
              className={action.className}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Component>
          );
        })}
      </SidebarFooter>
    </Sidebar>
  );
}

/**
 * Example usage:
 * 
 * const sections = [
 *   {
 *     id: 'colors',
 *     label: 'Colors',
 *     icon: '🎨',
 *     content: <ColorControls />
 *   },
 *   {
 *     id: 'typography',
 *     label: 'Typography',
 *     icon: 'Aa',
 *     content: <TypographyControls />
 *   }
 * ];
 * 
 * const footerActions = [
 *   {
 *     label: 'Export Theme',
 *     primary: true,
 *     onClick: handleExport
 *   },
 *   {
 *     label: 'Settings',
 *     primary: false,
 *     onClick: handleSettings,
 *     icon: '⚙️'
 *   }
 * ];
 * 
 * <StructuredSidebar
 *   sections={sections}
 *   footerActions={footerActions}
 *   activeTab="Theme"
 *   onTabChange={setActiveTab}
 * />
 */