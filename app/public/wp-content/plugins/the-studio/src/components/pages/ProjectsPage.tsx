import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchProjects, setActiveProject } from '@/store/slices/projectsSlice';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { AddProjectCard } from '@/components/projects/AddProjectCard';

const ProjectsContent = styled.div`
  flex: 1;
  padding: var(--studio-space-6);
  overflow-y: auto;
  background: var(--studio-bg-main);
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--studio-space-6);
  max-width: 1200px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: var(--studio-space-8);
  color: var(--studio-text-subtle);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: var(--studio-space-8);
  color: var(--studio-primary-600);
`;

export function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { projects, loading, error, activeProjectId } = useAppSelector((state) => state.projects);
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleSetActive = async (projectId: string) => {
    await dispatch(setActiveProject(projectId));
  };

  const handleAddProject = () => {
    // TODO: Implement add project modal
    console.log('Add project clicked');
  };

  if (loading) {
    return (
      <ProjectsContent>
        <LoadingMessage>Loading projects...</LoadingMessage>
      </ProjectsContent>
    );
  }

  if (error) {
    return (
      <ProjectsContent>
        <ErrorMessage>Error: {error}</ErrorMessage>
      </ProjectsContent>
    );
  }

  const projectList = Object.values(projects);

  return (
    <ProjectsContent>
      <ProjectsGrid>
        {projectList.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isActive={project.id === activeProjectId}
            onSetActive={handleSetActive}
          />
        ))}
        <AddProjectCard onClick={handleAddProject} />
      </ProjectsGrid>
    </ProjectsContent>
  );
}