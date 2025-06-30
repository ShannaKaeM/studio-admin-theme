import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/utils/api';

export interface Project {
  id: string;
  name: string;
  client: string;
  logo: string;
  isActive: boolean;
  activeTheme: string;
  stats: {
    totalColors: number;
    totalThemes: number;
    lastModified: string;
  };
  created?: string;
}

interface ProjectsState {
  projects: Record<string, Project>;
  loading: boolean;
  error: string | null;
  activeProjectId: string | null;
}

const initialState: ProjectsState = {
  projects: {},
  loading: false,
  error: null,
  activeProjectId: null,
};

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async () => {
    const response = await api.get('/projects');
    return response.data;
  }
);

export const createProject = createAsyncThunk(
  'projects/create',
  async (projectData: Partial<Project>) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ id, data }: { id: string; data: Partial<Project> }) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id: string) => {
    await api.delete(`/projects/${id}`);
    return id;
  }
);

export const setActiveProject = createAsyncThunk(
  'projects/setActive',
  async (id: string) => {
    const response = await api.post(`/projects/${id}/activate`);
    return { id, data: response.data };
  }
);

// Slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch projects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload as Record<string, Project>;
        // Find active project
        const projects = action.payload as Record<string, Project>;
        const activeProject = Object.values(projects).find((p) => p.isActive);
        state.activeProjectId = activeProject?.id || null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      });

    // Create project
    builder
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects[action.payload.id] = action.payload;
      });

    // Update project
    builder
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects[action.payload.id] = action.payload;
      });

    // Delete project
    builder
      .addCase(deleteProject.fulfilled, (state, action) => {
        delete state.projects[action.payload];
        if (state.activeProjectId === action.payload) {
          state.activeProjectId = null;
        }
      });

    // Set active project
    builder
      .addCase(setActiveProject.fulfilled, (state, action) => {
        // Deactivate all projects
        Object.keys(state.projects).forEach(id => {
          state.projects[id].isActive = false;
        });
        // Activate selected project
        if (state.projects[action.payload.id]) {
          state.projects[action.payload.id].isActive = true;
          state.activeProjectId = action.payload.id;
        }
      });
  },
});

export default projectsSlice.reducer;