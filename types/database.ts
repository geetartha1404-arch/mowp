export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      auth_logs: {
        Row: {
          created_at: string
          email: string | null
          event_type: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          event_type: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          event_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_digests: {
        Row: {
          ai_focus_summary: string | null
          blockers: string[] | null
          created_at: string
          date: string
          id: string
          overdue_items: string[] | null
          top_tasks: Json | null
          user_id: string
        }
        Insert: {
          ai_focus_summary?: string | null
          blockers?: string[] | null
          created_at?: string
          date: string
          id?: string
          overdue_items?: string[] | null
          top_tasks?: Json | null
          user_id: string
        }
        Update: {
          ai_focus_summary?: string | null
          blockers?: string[] | null
          created_at?: string
          date?: string
          id?: string
          overdue_items?: string[] | null
          top_tasks?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      prompt_logs: {
        Row: {
          created_at: string
          id: string
          input_reference: string | null
          model_used: string | null
          output_text: string | null
          prompt_version: string | null
          tokens_used: number | null
          user_id: string
          workflow_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          input_reference?: string | null
          model_used?: string | null
          output_text?: string | null
          prompt_version?: string | null
          tokens_used?: number | null
          user_id: string
          workflow_name: string
        }
        Update: {
          created_at?: string
          id?: string
          input_reference?: string | null
          model_used?: string | null
          output_text?: string | null
          prompt_version?: string | null
          tokens_used?: number | null
          user_id?: string
          workflow_name?: string
        }
        Relationships: []
      }
      weekly_reviews: {
        Row: {
          ai_review_summary: string | null
          carry_forward_items: string[] | null
          completed_count: number | null
          created_at: string
          id: string
          improvement_suggestions: string[] | null
          overdue_count: number | null
          user_id: string
          week_start: string
        }
        Insert: {
          ai_review_summary?: string | null
          carry_forward_items?: string[] | null
          completed_count?: number | null
          created_at?: string
          id?: string
          improvement_suggestions?: string[] | null
          overdue_count?: number | null
          user_id: string
          week_start: string
        }
        Update: {
          ai_review_summary?: string | null
          carry_forward_items?: string[] | null
          completed_count?: number | null
          created_at?: string
          id?: string
          improvement_suggestions?: string[] | null
          overdue_count?: number | null
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
      work_items: {
        Row: {
          ai_category: string | null
          ai_next_action: string | null
          ai_summary: string | null
          created_at: string
          description: string | null
          due_date: string | null
          effort_estimate: string | null
          id: string
          priority: string
          source: string | null
          status: string
          tags: string[] | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          ai_category?: string | null
          ai_next_action?: string | null
          ai_summary?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          effort_estimate?: string | null
          id?: string
          priority?: string
          source?: string | null
          status?: string
          tags?: string[] | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          ai_category?: string | null
          ai_next_action?: string | null
          ai_summary?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          effort_estimate?: string | null
          id?: string
          priority?: string
          source?: string | null
          status?: string
          tags?: string[] | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
