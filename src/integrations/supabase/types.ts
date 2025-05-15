export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string
          published_at: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string
          category: string
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image_url?: string
          published_at?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string
          published_at?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      careers: {
        Row: {
          id: string
          title: string
          department: string
          location: string
          description: string
          requirements: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          department: string
          location: string
          description: string
          requirements: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          department?: string
          location?: string
          description?: string
          requirements?: string
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      careers_applications: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          position_id: string
          cv_url: string
          message: string
          created_at: string
          is_reviewed: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          position_id: string
          cv_url: string
          message: string
          created_at?: string
          is_reviewed?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          position_id?: string
          cv_url?: string
          message?: string
          created_at?: string
          is_reviewed?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "careers_applications_position_id_fkey"
            columns: ["position_id"]
            referencedRelation: "careers"
            referencedColumns: ["id"]
          }
        ]
      }
      inquiries: {
        Row: {
          id: string
          property_id: string | null
          name: string
          email: string
          phone: string | null
          message: string
          created_at: string
          is_reviewed: boolean
        }
        Insert: {
          id?: string
          property_id?: string | null
          name: string
          email: string
          phone?: string | null
          message: string
          created_at?: string
          is_reviewed?: boolean
        }
        Update: {
          id?: string
          property_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          message?: string
          created_at?: string
          is_reviewed?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          area: number | null
          bedrooms: number | null
          bathrooms: number | null
          address: string
          city: string
          property_type: string
          listing_type: string
          is_featured: boolean | null
          is_published: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          area?: number | null
          bedrooms?: number | null
          bathrooms?: number | null
          address: string
          city: string
          property_type: string
          listing_type: string
          is_featured?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          area?: number | null
          bedrooms?: number | null
          bathrooms?: number | null
          address?: string
          city?: string
          property_type?: string
          listing_type?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          email: string | null
          phone: string | null
          avatar_url: string | null
          role: string | null
          created_at: string | null
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sell_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          property_type: string
          property_location: string
          message: string
          created_at: string
          is_reviewed: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          property_type: string
          property_location: string
          message: string
          created_at?: string
          is_reviewed?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          property_type?: string
          property_location?: string
          message?: string
          created_at?: string
          is_reviewed?: boolean
        }
        Relationships: []
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          name: string
          position: string
          bio: string | null
          image_url: string | null
          order_index: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          position: string
          bio?: string | null
          image_url?: string | null
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          position?: string
          bio?: string | null
          image_url?: string | null
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      viewings: {
        Row: {
          id: string
          property_id: string
          customer_name: string
          customer_email: string
          customer_phone: string
          viewing_date: string
          status: string
          created_at: string
          additional_notes: string | null
        }
        Insert: {
          id?: string
          property_id: string
          customer_name: string
          customer_email: string
          customer_phone: string
          viewing_date: string
          status?: string
          created_at?: string
          additional_notes?: string | null
        }
        Update: {
          id?: string
          property_id?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          viewing_date?: string
          status?: string
          created_at?: string
          additional_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "viewings_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
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

export type TeamMember = Database['public']['Tables']['team_members']['Row']

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["public", "authenticated", "agent", "admin"],
    },
  },
} as const
