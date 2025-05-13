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
      blog_posts: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string
          id: string
          image_url: string | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          excerpt: string
          id?: string
          image_url?: string | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string
          id?: string
          image_url?: string | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      careers: {
        Row: {
          created_at: string | null
          department: string
          description: string
          id: string
          is_active: boolean | null
          location: string
          requirements: string
          title: string
        }
        Insert: {
          created_at?: string | null
          department: string
          description: string
          id?: string
          is_active?: boolean | null
          location: string
          requirements: string
          title: string
        }
        Update: {
          created_at?: string | null
          department?: string
          description?: string
          id?: string
          is_active?: boolean | null
          location?: string
          requirements?: string
          title?: string
        }
        Relationships: []
      }
      careers_applications: {
        Row: {
          cover_letter: string | null
          created_at: string | null
          cv_url: string | null
          email: string
          full_name: string
          id: string
          phone: string
          position_id: string | null
          status: string | null
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string | null
          cv_url?: string | null
          email: string
          full_name: string
          id?: string
          phone: string
          position_id?: string | null
          status?: string | null
        }
        Update: {
          cover_letter?: string | null
          created_at?: string | null
          cv_url?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string
          position_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "careers_applications_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          property_id: string
          responded: boolean
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          property_id: string
          responded?: boolean
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          property_id?: string
          responded?: boolean
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          area: number | null
          bathrooms: number | null
          bedrooms: number | null
          city: string
          created_at: string | null
          description: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          listing_type: string
          owner_id: string
          price: number
          property_type: string
          title: string
          updated_at: string | null
        }
        Insert: {
          address: string
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          listing_type: string
          owner_id: string
          price: number
          property_type: string
          title: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          listing_type?: string
          owner_id?: string
          price?: number
          property_type?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sell_requests: {
        Row: {
          address: string
          consultation_date: string | null
          created_at: string
          description: string | null
          email: string
          id: string
          name: string
          phone: string
          price: number | null
          property_type: string
          status: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          consultation_date?: string | null
          created_at?: string
          description?: string | null
          email: string
          id?: string
          name: string
          phone: string
          price?: number | null
          property_type: string
          status?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          consultation_date?: string | null
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          price?: number | null
          property_type?: string
          status?: string
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          is_highlighted: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          is_highlighted?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          is_highlighted?: boolean | null
          name?: string
        }
        Relationships: []
      }
      viewings: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          property_id: string
          status: string
          user_id: string | null
          viewing_date: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          property_id: string
          status?: string
          user_id?: string | null
          viewing_date: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          property_id?: string
          status?: string
          user_id?: string | null
          viewing_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "viewings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      user_has_role: {
        Args: { requested_role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "public" | "authenticated" | "agent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

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
      app_role: ["public", "authenticated", "agent"],
    },
  },
} as const
