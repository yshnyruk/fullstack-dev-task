export interface Project {
  id: string | null;
  title: string;
  user_id: number | null;
  created_by: string;
  created_at: Date;
}