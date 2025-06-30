import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleTheme, setActivePage } from '@/store/slices/uiSlice';

const StudioSidebar = styled.div`
  background: var(--studio-bg-sidebar);
  border-right: 1px solid var(--studio-border-ui);
  display: flex;
  flex-direction: column;
`;

const StudioHeader = styled.div`
  background: var(--studio-bg-sidebar-header);
  padding: var(--studio-space-4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--studio-space-3);
  height: 100px;
`;

const StudioBrand = styled.div`
  display: flex;
  align-items: center;
  gap: var(--studio-space-3);
`;

const StudioLogo = styled.svg`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

const StudioTitle = styled.div`
  font-size: var(--studio-text-card-title);
  font-weight: 600;
  color: var(--studio-text-navigation);
`;

const StudioNav = styled.nav`
  flex: 1;
  padding: var(--studio-space-5);
`;

const StudioNavSection = styled.div`
  margin-bottom: var(--studio-space-6);
`;

const StudioNavTitle = styled.div`
  font-size: var(--studio-text-metadata);
  font-weight: 600;
  color: var(--studio-text-subtle);
  margin-bottom: var(--studio-space-3);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StudioNavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: var(--studio-space-2) var(--studio-space-3);
  color: var(--studio-text-supporting);
  text-decoration: none;
  border-radius: var(--studio-radius-sm);
  margin-bottom: var(--studio-space-1);
  transition: all 0.2s ease;
  font-size: var(--studio-text-interface);
  gap: var(--studio-space-2);
  cursor: pointer;

  &:hover {
    background: var(--studio-bg-card);
    color: var(--studio-text-content);
  }

  ${props => props.$active && `
    background: linear-gradient(135deg, var(--studio-primary-500), var(--studio-secondary-500));
    color: white;
    font-weight: 500;
  `}
`;

const StudioNavIcon = styled.span`
  width: 16px;
  height: 16px;
  font-size: var(--studio-text-interface);
`;

const ThemeToggleSection = styled.div`
  padding: var(--studio-space-4);
  margin-top: auto;
  border-top: 1px solid var(--studio-border-ui);
`;

const ThemeToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ThemeToggleLabel = styled.div`
  font-size: var(--studio-text-metadata);
  color: var(--studio-text-subtle);
`;

const ThemeToggle = styled.button<{ $isDark?: boolean }>`
  position: relative;
  width: 48px;
  height: 24px;
  border: var(--studio-border-medium) solid var(--studio-border-interactive);
  border-radius: 14px;
  background: var(--studio-bg-sidebar);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background: linear-gradient(135deg, var(--studio-primary-500), var(--studio-secondary-500));
    border-radius: 50%;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    
    ${props => props.$isDark && `
      transform: translateX(24px);
    `}
  }

  &:hover {
    border-color: var(--studio-primary-500);
  }
`;

export function Sidebar() {
  const dispatch = useAppDispatch();
  const { isDarkMode, activePage } = useAppSelector((state) => state.ui);

  const handleNavClick = (page: string) => {
    dispatch(setActivePage(page));
  };

  return (
    <StudioSidebar>
      <StudioHeader>
        <StudioBrand>
          <StudioLogo viewBox="0 0 103 104" fill="none">
            <rect x="3.5" y="3.49963" width="95.6918" height="96.1796" rx="15.22" stroke="url(#paint0_linear)" strokeWidth="7"/>
            <path d="M66.2096 37.8214C65.8459 35.156 64.3459 33.0913 61.7096 31.6272C59.0732 30.1444 55.755 29.4029 51.755 29.4029C48.8914 29.4029 46.4141 29.7784 44.3232 30.5292C42.2323 31.2612 40.6073 32.2748 39.4482 33.57C38.3118 34.8463 37.7437 36.301 37.7437 37.9341C37.7437 39.3043 38.13 40.4868 38.9027 41.4816C39.6982 42.4765 40.7323 43.3117 42.005 43.9875C43.3005 44.6444 44.6868 45.1982 46.1641 45.6486C47.6414 46.0804 49.0618 46.437 50.4255 46.7186L57.2437 48.1826C59.4709 48.6331 61.755 49.2432 64.0959 50.0127C66.4368 50.7823 68.6073 51.7959 70.6073 53.0535C72.6073 54.3111 74.2209 55.8691 75.4482 57.7273C76.6982 59.5856 77.3232 61.8099 77.3232 64.4002C77.3232 67.6662 76.3005 70.5662 74.255 73.1002C72.2323 75.6342 69.2891 77.6332 65.4255 79.0973C61.5846 80.5614 56.9368 81.2935 51.4823 81.2935C46.255 81.2935 41.7323 80.6083 37.9141 79.2381C34.0959 77.8679 31.1073 75.9251 28.9482 73.4099C26.7891 70.8759 25.5959 67.8727 25.3687 64.4002H35.9368C36.1414 66.4837 36.9596 68.2199 38.3914 69.6089C39.8459 70.9792 41.6982 72.0022 43.9482 72.6779C46.2209 73.3348 48.7096 73.6633 51.4141 73.6633C54.3914 73.6633 57.0391 73.2785 59.3573 72.5089C61.6982 71.7206 63.5391 70.6319 64.88 69.2429C66.2209 67.8351 66.8914 66.1927 66.8914 64.3157C66.8914 62.6076 66.3005 61.2092 65.1187 60.1205C63.9596 59.0319 62.38 58.1309 60.38 57.4176C58.4027 56.7044 56.1641 56.0756 53.6641 55.5312L45.4141 53.673C39.8232 52.4153 35.3914 50.5665 32.1187 48.1263C28.8687 45.6862 27.2437 42.4577 27.2437 38.4408C27.2437 35.1185 28.3346 32.2185 30.5164 29.7408C32.6982 27.2631 35.6527 25.3392 39.38 23.9689C43.1073 22.5799 47.3118 21.8854 51.9937 21.8854C56.7209 21.8854 60.8914 22.5706 64.505 23.9408C68.1414 25.311 71.005 27.1974 73.0959 29.6C75.1868 31.9839 76.2777 34.7243 76.3687 37.8214H66.2096Z" fill="url(#paint1_linear)"/>
            <defs>
              <linearGradient id="paint0_linear" x1="1.23267e-06" y1="8.7248" x2="99.6891" y2="102.708" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--studio-primary-500)"/>
                <stop offset="1" stopColor="var(--studio-secondary-500)"/>
              </linearGradient>
              <linearGradient id="paint1_linear" x1="25.3687" y1="26.9091" x2="81.8625" y2="73.7083" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--studio-primary-500)"/>
                <stop offset="1" stopColor="var(--studio-secondary-500)"/>
              </linearGradient>
            </defs>
          </StudioLogo>
          <StudioTitle>The Studio</StudioTitle>
        </StudioBrand>
      </StudioHeader>

      <StudioNav>
        <StudioNavSection>
          <StudioNavItem 
            $active={activePage === 'projects'}
            onClick={() => handleNavClick('projects')}
          >
            <StudioNavIcon>📁</StudioNavIcon>
            Projects
          </StudioNavItem>
        </StudioNavSection>

        <StudioNavSection>
          <StudioNavTitle>Design System</StudioNavTitle>
          <StudioNavItem 
            onClick={() => handleNavClick('colors')}
            style={{ opacity: 0.5, pointerEvents: 'none' }}
          >
            <StudioNavIcon>🎨</StudioNavIcon>
            Colors
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>(Soon)</span>
          </StudioNavItem>
          <StudioNavItem 
            onClick={() => handleNavClick('typography')}
            style={{ opacity: 0.5, pointerEvents: 'none' }}
          >
            <StudioNavIcon>📝</StudioNavIcon>
            Typography
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>(Soon)</span>
          </StudioNavItem>
          <StudioNavItem 
            onClick={() => handleNavClick('layouts')}
            style={{ opacity: 0.5, pointerEvents: 'none' }}
          >
            <StudioNavIcon>📐</StudioNavIcon>
            Layouts
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>(Soon)</span>
          </StudioNavItem>
          <StudioNavItem 
            onClick={() => handleNavClick('scopes')}
            style={{ opacity: 0.5, pointerEvents: 'none' }}
          >
            <StudioNavIcon>💎</StudioNavIcon>
            Scopes
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>(Soon)</span>
          </StudioNavItem>
        </StudioNavSection>

        <StudioNavSection style={{ marginTop: 'auto', marginBottom: 'var(--studio-space-4)' }}>
          <StudioNavItem 
            onClick={() => handleNavClick('settings')}
            style={{ opacity: 0.5, pointerEvents: 'none' }}
          >
            <StudioNavIcon>⚙️</StudioNavIcon>
            Settings
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>(Soon)</span>
          </StudioNavItem>
        </StudioNavSection>
      </StudioNav>

      <ThemeToggleSection>
        <ThemeToggleWrapper>
          <ThemeToggleLabel>Toggle Theme</ThemeToggleLabel>
          <ThemeToggle 
            $isDark={isDarkMode}
            onClick={() => dispatch(toggleTheme())}
            title="Switch between light and dark mode"
          />
        </ThemeToggleWrapper>
      </ThemeToggleSection>
    </StudioSidebar>
  );
}