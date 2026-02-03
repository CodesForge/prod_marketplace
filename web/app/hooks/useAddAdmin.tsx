import { useMutation } from "@tanstack/react-query";
import { AdminAddTypeSchema } from "@/schemas/addAdmin";
import { AdminAdd } from "@/api/add_admin";

export function useAddAdmin() {
    const mutation = useMutation({
        mutationFn: (data: AdminAddTypeSchema) => AdminAdd(data),
    });
    return mutation
}
