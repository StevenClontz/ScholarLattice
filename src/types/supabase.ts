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
      collection_admins: {
        Row: {
          collection_id: string
          created_at: string
          id: string
          profile_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          id?: string
          profile_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_admins_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_admins_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "full_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_admins_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_admins_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "verified_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      collections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          open_registration: boolean
          parent_id: string | null
          short_title: string | null
          title: string | null
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          open_registration?: boolean
          parent_id?: string | null
          short_title?: string | null
          title?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          open_registration?: boolean
          parent_id?: string | null
          short_title?: string | null
          title?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collections_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          affiliation: string | null
          first_name: string
          id: string
          last_name: string
          website: string | null
        }
        Insert: {
          affiliation?: string | null
          first_name?: string
          id: string
          last_name?: string
          website?: string | null
        }
        Update: {
          affiliation?: string | null
          first_name?: string
          id?: string
          last_name?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_status: {
        Row: {
          id: string
          verified: boolean
        }
        Insert: {
          id: string
          verified?: boolean
        }
        Update: {
          id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "profiles_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "full_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "verified_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      registration_options: {
        Row: {
          collection_id: string
          created_at: string
          description: string
          id: string
          title: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          description?: string
          id?: string
          title?: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          description?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "registration_options_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          }
        ]
      }
      registrations: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          registration_option_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          registration_option_id: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          registration_option_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "full_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "verified_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_registration_option_id_fkey"
            columns: ["registration_option_id"]
            isOneToOne: false
            referencedRelation: "registration_options"
            referencedColumns: ["id"]
          }
        ]
      }
      submissions: {
        Row: {
          abstract: string
          collection_id: string
          created_at: string
          id: string
          profile_id: string
          title: string
        }
        Insert: {
          abstract: string
          collection_id: string
          created_at?: string
          id?: string
          profile_id: string
          title: string
        }
        Update: {
          abstract?: string
          collection_id?: string
          created_at?: string
          id?: string
          profile_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "full_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "verified_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      submissions_status: {
        Row: {
          id: string
          status: Database["public"]["Enums"]["submission_status"]
        }
        Insert: {
          id: string
          status?: Database["public"]["Enums"]["submission_status"]
        }
        Update: {
          id?: string
          status?: Database["public"]["Enums"]["submission_status"]
        }
        Relationships: [
          {
            foreignKeyName: "submissions_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "accepted_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      accepted_submissions: {
        Row: {
          abstract: string | null
          affiliation: string | null
          collection_id: string | null
          collection_short_title: string | null
          collection_title: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          profile_id: string | null
          status: Database["public"]["Enums"]["submission_status"] | null
          title: string | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "full_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "verified_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      full_profiles: {
        Row: {
          affiliation: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          verified: boolean | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      verified_profiles: {
        Row: {
          affiliation: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          verified: boolean | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      is_admin_of: {
        Args: {
          _profile_id: string
          _collection_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      submission_status: "submitted" | "accepted" | "declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
