import styled from 'styled-components';
import { useAppSelector } from '@/store/hooks';

const StudioRightSidebar = styled.div`
  background: var(--studio-bg-sidebar);
  border-left: 1px solid var(--studio-border-ui);
  display: flex;
  flex-direction: column;
`;

const StudioRightHeader = styled.div`
  background: var(--studio-bg-sidebar-header);
  padding: var(--studio-space-4);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: var(--studio-space-3);
  height: 100px;
  position: relative;
`;

const StudioRightContent = styled.div`
  flex: 1;
  padding: var(--studio-space-5);
  overflow-y: auto;
`;

const StudioSection = styled.div`
  margin-bottom: var(--studio-space-6);
`;

const StudioSectionTitle = styled.h3`
  font-size: var(--studio-text-interface);
  font-weight: 600;
  color: var(--studio-text-subtle);
  margin-bottom: var(--studio-space-3);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StudioField = styled.div`
  margin-bottom: var(--studio-space-3);
`;

const StudioButton = styled.button`
  padding: var(--studio-space-3) var(--studio-space-4);
  border: var(--studio-border-thin) solid var(--studio-primary-500);
  border-radius: var(--studio-radius);
  background: var(--studio-primary-500);
  color: white;
  font-family: var(--studio-font-family);
  font-size: var(--studio-text-interface);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: var(--studio-primary-600);
    border-color: var(--studio-primary-600);
  }

  &.secondary {
    background: var(--studio-bg-button);
    color: var(--studio-text-content);
    border-color: var(--studio-border-medium);

    &:hover {
      background: var(--studio-bg-card);
      border-color: var(--studio-border-card);
    }
  }
`;

const StudioCount = styled.div`
  text-align: center;
  margin-top: var(--studio-space-4);
  color: var(--studio-text-subtle);
  font-size: var(--studio-text-interface);
`;

const ProjectInfo = styled.div`
  background: var(--studio-bg-card);
  padding: var(--studio-space-3);
  border-radius: var(--studio-radius);
  margin-bottom: var(--studio-space-3);
`;

const ProjectName = styled.div`
  font-weight: 600;
  color: var(--studio-text-content);
  margin-bottom: var(--studio-space-1);
`;

const ProjectDetail = styled.div`
  font-size: var(--studio-text-metadata);
  color: var(--studio-text-subtle);
`;

export function RightSidebar() {
  const { projects, activeProjectId } = useAppSelector((state) => state.projects);
  const activePage = useAppSelector((state) => state.ui.activePage);

  const activeProject = activeProjectId ? projects[activeProjectId] : null;
  const projectCount = Object.keys(projects).length;

  if (activePage !== 'projects') {
    return (
      <StudioRightSidebar>
        <StudioRightHeader />
        <StudioRightContent>
          <StudioSection>
            <StudioSectionTitle>Page Info</StudioSectionTitle>
            <p style={{ color: 'var(--studio-text-subtle)', fontSize: 'var(--studio-text-interface)' }}>
              Select a page from the sidebar to view options.
            </p>
          </StudioSection>
        </StudioRightContent>
      </StudioRightSidebar>
    );
  }

  return (
    <StudioRightSidebar>
      <StudioRightHeader />
      
      <StudioRightContent>
        {/* Active Project Section */}
        <StudioSection>
          <StudioSectionTitle>Active Project</StudioSectionTitle>
          
          {activeProject ? (
            <ProjectInfo>
              <ProjectName>{activeProject.name}</ProjectName>
              <ProjectDetail>{activeProject.client}</ProjectDetail>
              <ProjectDetail>Theme: {activeProject.activeTheme}</ProjectDetail>
            </ProjectInfo>
          ) : (
            <p style={{ color: 'var(--studio-text-subtle)', fontSize: 'var(--studio-text-interface)' }}>
              No active project selected
            </p>
          )}
        </StudioSection>

        {/* Project Management Section */}
        <StudioSection>
          <StudioSectionTitle>Project Management</StudioSectionTitle>
          
          <StudioField>
            <StudioButton className="secondary">
              + Add New Project
            </StudioButton>
          </StudioField>

          <StudioField>
            <StudioButton className="secondary">
              Import Project
            </StudioButton>
          </StudioField>

          <StudioField>
            <StudioButton className="secondary">
              Export All Projects
            </StudioButton>
          </StudioField>

          <StudioCount>{projectCount} total projects</StudioCount>
        </StudioSection>

        {/* Quick Actions Section */}
        <StudioSection>
          <StudioSectionTitle>Quick Actions</StudioSectionTitle>
          
          <StudioField>
            <StudioButton className="secondary">
              Generate CSS
            </StudioButton>
          </StudioField>

          <StudioField>
            <StudioButton className="secondary">
              Preview Theme
            </StudioButton>
          </StudioField>
        </StudioSection>
      </StudioRightContent>
    </StudioRightSidebar>
  );
}