import styled from 'styled-components';
import { Project } from '@/store/slices/projectsSlice';

const StudioProjectCard = styled.div<{ $isActive?: boolean }>`
  background: var(--studio-bg-card);
  border: var(--studio-border-thick) solid ${props => 
    props.$isActive ? 'transparent' : 'var(--studio-border-primary)'};
  border-radius: var(--studio-radius-xl);
  overflow: hidden;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease;
  padding: var(--studio-space-5);
  font-family: 'Montserrat', sans-serif;

  ${props => props.$isActive && `
    background: linear-gradient(var(--studio-bg-card), var(--studio-bg-card)) padding-box,
                linear-gradient(135deg, var(--studio-primary-500), var(--studio-secondary-500)) border-box;
    border: var(--studio-border-thick) solid transparent;
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectLogo = styled.div`
  height: 140px;
  position: relative;
  border-radius: var(--studio-radius-lg);
  margin-bottom: var(--studio-space-4);
  background: var(--studio-bg-controls);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &:empty::after {
    content: '🏢';
    font-size: 3rem;
    opacity: 0.3;
  }
`;

const ProjectInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectName = styled.div`
  font-size: var(--studio-text-card-title);
  font-weight: 600;
  color: var(--studio-text-content);
  margin-bottom: var(--studio-space-2);
`;

const ProjectClient = styled.div`
  font-size: var(--studio-text-interface);
  color: var(--studio-text-supporting);
  margin-bottom: var(--studio-space-4);
`;

const ProjectStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--studio-space-2);
  margin-bottom: var(--studio-space-4);
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--studio-text-metadata);
`;

const StatLabel = styled.span`
  color: var(--studio-text-subtle);
`;

const StatValue = styled.span`
  color: var(--studio-text-supporting);
  font-weight: 500;
`;

const ProjectControls = styled.div`
  display: flex;
  align-items: center;
  gap: var(--studio-space-2);
  margin-top: auto;
`;

const ActiveToggle = styled.label`
  display: flex;
  align-items: center;
  gap: var(--studio-space-2);
  cursor: pointer;
  font-size: var(--studio-text-interface);
  color: var(--studio-text-supporting);

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    accent-color: var(--studio-primary-500);
  }
`;

const ActionButton = styled.button`
  padding: var(--studio-space-2);
  background: transparent;
  border: none;
  color: var(--studio-text-subtle);
  cursor: pointer;
  font-size: var(--studio-text-interface);
  transition: all 0.2s ease;

  &:hover {
    color: var(--studio-text-content);
  }
`;

const ActiveBadge = styled.div`
  position: absolute;
  top: var(--studio-space-3);
  right: var(--studio-space-3);
  background: linear-gradient(135deg, var(--studio-primary-500), var(--studio-secondary-500));
  color: white;
  padding: var(--studio-space-1) var(--studio-space-3);
  border-radius: var(--studio-radius);
  font-size: var(--studio-text-metadata);
  font-weight: 600;
  text-transform: uppercase;
`;

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onSetActive: (id: string) => void;
}

export function ProjectCard({ project, isActive, onSetActive }: ProjectCardProps) {
  const handleToggleActive = () => {
    if (!isActive) {
      onSetActive(project.id);
    }
  };

  return (
    <StudioProjectCard $isActive={isActive}>
      {isActive && <ActiveBadge>Active</ActiveBadge>}
      
      <ProjectLogo>
        {project.logo && <img src={project.logo} alt={project.name} />}
      </ProjectLogo>

      <ProjectInfo>
        <ProjectName>{project.name}</ProjectName>
        <ProjectClient>{project.client || 'No client specified'}</ProjectClient>

        <ProjectStats>
          <StatRow>
            <StatLabel>Colors:</StatLabel>
            <StatValue>{project.stats.totalColors}</StatValue>
          </StatRow>
          <StatRow>
            <StatLabel>Themes:</StatLabel>
            <StatValue>{project.stats.totalThemes}</StatValue>
          </StatRow>
          <StatRow>
            <StatLabel>Modified:</StatLabel>
            <StatValue>{new Date(project.stats.lastModified).toLocaleDateString()}</StatValue>
          </StatRow>
        </ProjectStats>

        <ProjectControls>
          <ActiveToggle>
            <input 
              type="checkbox" 
              checked={isActive}
              onChange={handleToggleActive}
            />
            Set as Active
          </ActiveToggle>
          
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--studio-space-1)' }}>
            <ActionButton title="Edit">✏️</ActionButton>
            <ActionButton title="Duplicate">📋</ActionButton>
            <ActionButton title="Delete">🗑️</ActionButton>
          </div>
        </ProjectControls>
      </ProjectInfo>
    </StudioProjectCard>
  );
}