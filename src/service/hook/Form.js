import { useMutation } from '@tanstack/react-query';

import { endpoints } from '../endPoints'
import rootApi from '../rootApi';

const useCreateFood = () => {
//   const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables) => {
      return rootApi.post(endpoints.API.SUBMIT, variables);
    },
    onError: (e) => {
    //   showToast(e?.response?.data?.message || 'Đã có lỗi xảy ra', { type: 'error' });
    },
    onSuccess: (res) => {
    //   showToast(res?.data?.message || 'Create successfully!', { type: 'success' });
    //   closeModal();
    //   query.invalidateQueries([endpoints.API.FOOD.PAGINATION]);
    //   query.invalidateQueries([endpoints.API.DASHBOARD.DATA]);
    },
  });
  return {
    isLoading: isPending,
    isError,
    data,
    error,
    onCreate: mutateAsync,
  };
};

export default useCreateFood;
