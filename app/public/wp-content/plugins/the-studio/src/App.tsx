import styled from 'styled-components';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { RightSidebar } from './components/layout/RightSidebar';
import { useAppSelector } from './store/hooks';

const StudioApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--studio-bg-main);
  color: var(--studio-text-content);
  font-family: var(--studio-font-family);
`;

const StudioLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  flex: 1;
  overflow: hidden;
`;

function App() {
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);

  return (
    <StudioApp data-theme={isDarkMode ? 'dark' : 'light'}>
      <StudioLayout>
        <Sidebar />
        <MainContent />
        <RightSidebar />
      </StudioLayout>
    </StudioApp>
  );
}

export default App;