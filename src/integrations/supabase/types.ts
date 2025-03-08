export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          description: string
          earned_at: string | null
          id: string
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          description: string
          earned_at?: string | null
          id?: string
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          description?: string
          earned_at?: string | null
          id?: string
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      project_steps: {
        Row: {
          code_example: string | null
          created_at: string | null
          description: string
          hints: string[] | null
          id: string
          project_id: string | null
          step_number: number
          title: string
          updated_at: string | null
          validation: Json
        }
        Insert: {
          code_example?: string | null
          created_at?: string | null
          description: string
          hints?: string[] | null
          id?: string
          project_id?: string | null
          step_number: number
          title: string
          updated_at?: string | null
          validation: Json
        }
        Update: {
          code_example?: string | null
          created_at?: string | null
          description?: string
          hints?: string[] | null
          id?: string
          project_id?: string | null
          step_number?: number
          title?: string
          updated_at?: string | null
          validation?: Json
        }
        Relationships: [
          {
            foreignKeyName: "project_steps_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          description: string
          difficulty: string
          estimated_hours: number
          id: string
          prerequisites: string[] | null
          title: string
          tools: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          difficulty: string
          estimated_hours: number
          id?: string
          prerequisites?: string[] | null
          title: string
          tools?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          difficulty?: string
          estimated_hours?: number
          id?: string
          prerequisites?: string[] | null
          title?: string
          tools?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_steps: string[] | null
          current_step: number
          id: string
          last_accessed_at: string | null
          project_id: string | null
          started_at: string | null
          streak: number | null
          user_id: string | null
        }
        Insert: {
          completed_steps?: string[] | null
          current_step?: number
          id?: string
          last_accessed_at?: string | null
          project_id?: string | null
          started_at?: string | null
          streak?: number | null
          user_id?: string | null
        }
        Update: {
          completed_steps?: string[] | null
          current_step?: number
          id?: string
          last_accessed_at?: string | null
          project_id?: string | null
          started_at?: string | null
          streak?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
