"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { CreateUserInput, LoginUserInput } from "@/lib/user-schema";

export async function signUpWithEmailAndPassword({
  data,
  emailRedirectTo,
}: {
  data: CreateUserInput;
  emailRedirectTo?: string;
}) {
  const supabase = await createSupabaseServerClient();

  const { data: user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { emailRedirectTo },
  });

  if (error) {
    return JSON.stringify({ error: error.message });
  }

  return JSON.stringify({ user });
}

export async function signInWithEmailAndPassword(data: LoginUserInput) {
  const supabase = await createSupabaseServerClient();

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return JSON.stringify({ error: error.message });
  }

  return JSON.stringify({ user });
}
