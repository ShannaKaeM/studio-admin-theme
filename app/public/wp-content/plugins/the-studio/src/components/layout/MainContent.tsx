import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setActiveTab } from '@/store/slices/uiSlice';
import { ProjectsPage } from '@/components/pages/ProjectsPage';

const StudioMain = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StudioTopHeader = styled.div`
  padding: var(--studio-space-4) var(--studio-space-8);
  border-bottom: 1px solid var(--studio-border-ui);
  background: var(--studio-bg-header);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const StudioSubNav = styled.nav`
  display: flex;
  gap: var(--studio-space-6);
`;

const StudioSubNavItem = styled.a<{ $active?: boolean }>`
  padding: var(--studio-space-2) var(--studio-space-4);
  color: var(--studio-text-navigation);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--studio-text-interface);
  border-radius: var(--studio-radius);
  transition: all 0.2s ease;
  border: 1px solid transparent;
  opacity: 0.7;
  cursor: pointer;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }

  ${props => props.$active && `
    opacity: 1;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  `}
`;

const StudioSectionHeader = styled.div`
  padding: var(--studio-space-6) var(--studio-space-6) var(--studio-space-3);
`;

const SectionContainer = styled.div`
  background: var(--studio-bg-card);
  border-radius: var(--studio-radius-xl);
  padding: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0;
  align-items: center;
  border: var(--studio-border-thick) solid var(--studio-border-primary);
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
`;

const SectionTitleStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--studio-space-1);
  padding: var(--studio-space-5);
  width: 100%;
  min-height: 100%;
  justify-content: center;
`;

const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--studio-primary-500), var(--studio-secondary-500));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  white-space: nowrap;
  line-height: 1.1;
`;

const SubTitle = styled.h2`
  font-size: var(--studio-text-interface);
  font-weight: 400;
  color: var(--studio-text-subtle);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 1.2;
`;

const SectionDescription = styled.div`
  color: var(--studio-text-supporting);
  line-height: 1.5;
  font-size: var(--studio-text-description);
  margin: 0;
  padding: var(--studio-space-5);
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 24px;
    background: linear-gradient(135deg, var(--studio-primary-500), var(--studio-secondary-500));
    border-radius: 2px;
  }

  p {
    margin: 0;
  }
`;

export function MainContent() {
  const dispatch = useAppDispatch();
  const { activePage, activeTab } = useAppSelector((state) => state.ui);

  const handleTabClick = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  const getPageDescription = () => {
    if (activePage === 'projects' && activeTab === 'dashboard') {
      return 'Manage your client projects and activate themes. Only one project can be active at a time, determining which theme applies to your site.';
    }
    if (activePage === 'projects' && activeTab === 'assets') {
      return 'Upload and manage assets for your projects including logos, images, and other media files.';
    }
    return 'Professional Visual Design System Builder for WordPress';
  };

  return (
    <StudioMain>
      {activePage === 'projects' && (
        <StudioTopHeader>
          <StudioSubNav>
            <StudioSubNavItem 
              $active={activeTab === 'dashboard'}
              onClick={() => handleTabClick('dashboard')}
            >
              Dashboard
            </StudioSubNavItem>
            <StudioSubNavItem 
              $active={activeTab === 'assets'}
              onClick={() => handleTabClick('assets')}
            >
              Assets
            </StudioSubNavItem>
          </StudioSubNav>
        </StudioTopHeader>
      )}

      <StudioSectionHeader>
        <SectionContainer>
          <SectionTitleStack>
            <MainTitle>Projects</MainTitle>
            <SubTitle>{activeTab === 'dashboard' ? 'DASHBOARD' : 'ASSETS'}</SubTitle>
          </SectionTitleStack>
          <SectionDescription>
            <p>{getPageDescription()}</p>
          </SectionDescription>
        </SectionContainer>
      </StudioSectionHeader>

      {activePage === 'projects' && activeTab === 'dashboard' && <ProjectsPage />}
      {activePage === 'projects' && activeTab === 'assets' && (
        <div style={{ padding: 'var(--studio-space-6)', textAlign: 'center', color: 'var(--studio-text-subtle)' }}>
          Assets page coming soon...
        </div>
      )}
    </StudioMain>
  );
}