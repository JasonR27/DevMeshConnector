import {
  useQuery,
  useQueries,
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as api from './api';

export function getAllProfilesQuery() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: api.getProfiles,
  });
}

export function getAllPostsQuery() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: api.getPosts,
  });
}

export function getProfilesByUserQuery() {
  return useQuery({
    queryKey: ["user_profiles"],
    queryFn: api.getProfilesByUser,
  });
}

export function getMainProfileQuery() { 
  return useQuery({
    queryKey: ["main_profile"],
    queryFn: api.getMainProfile,
  });
}

export function getCurrentProfileQuery() {
  return useQuery({
    queryKey: ["current_profile"],
    queryFn: api.getCurrentProfile,
  });
}

export function getCurrentProfilePostsQuery() {
  return useQuery({
    queryKey: ["current_profile_posts"],
    queryFn: api.getProfilePosts,
  });
}

export function getCommentQuery(commentId: string) {
  return useQuery({
    queryKey: ["comment", commentId],
    queryFn: () => api.getComment(commentId),
  });
}

//   export function getProfilesQuery(id: (number | undefined)[] | undefined) {
//     return useQueries({
//       queries: (ids ?? []).map((id) => {
//         return {
//           queryKey: ["todo", { id }],
//           queryFn: () => getTodo(id!),
//         };
//       }),
//     });
//   }
