import styled from 'styled-components';

const StudioAddProjectCard = styled.div`
  border: var(--studio-border-medium) dashed var(--studio-border-ghost);
  background: transparent;
  opacity: 0.8;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 400px;
  border-radius: var(--studio-radius-xl);
  padding: var(--studio-space-5);

  &:hover {
    opacity: 0.95;
    border-color: var(--studio-border-ghost-hover);
  }
`;

const AddProjectIcon = styled.div`
  background: transparent !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--studio-border-medium) dashed var(--studio-border-ghost);
  border-radius: 50%;
  margin-bottom: var(--studio-space-6);
  opacity: 0.8;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
`;

const AddIcon = styled.div`
  font-size: 2rem;
  color: var(--studio-text-subtle);
  font-weight: 300;
  opacity: 0.7;
  font-family: 'Montserrat', sans-serif;
`;

const AddProjectTitle = styled.div`
  color: var(--studio-text-subtle) !important;
  font-weight: 500;
  margin-bottom: var(--studio-space-2);
  opacity: 0.7;
  font-family: 'Montserrat', sans-serif;
  font-size: var(--studio-text-card-title);
`;

const AddProjectSubtitle = styled.div`
  font-size: var(--studio-text-interface);
  color: var(--studio-text-subtle);
  font-weight: 400;
  line-height: 1.4;
  opacity: 0.5;
  font-family: 'Montserrat', sans-serif;
`;

interface AddProjectCardProps {
  onClick: () => void;
}

export function AddProjectCard({ onClick }: AddProjectCardProps) {
  return (
    <StudioAddProjectCard onClick={onClick}>
      <AddProjectIcon>
        <AddIcon>+</AddIcon>
      </AddProjectIcon>
      <AddProjectTitle>Add New Project</AddProjectTitle>
      <AddProjectSubtitle>Create a new project for your client</AddProjectSubtitle>
    </StudioAddProjectCard>
  );
}