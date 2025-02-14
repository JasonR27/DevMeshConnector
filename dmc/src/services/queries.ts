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

  export function getCommentQuery() {
    return useQuery({
      queryKey: ["comment"],
      queryFn: api.getComment,
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
