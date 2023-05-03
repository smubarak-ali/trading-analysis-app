import axios, { CancelTokenSource } from "axios";
import useSWR, { Key, SWRConfiguration, SWRResponse } from "swr";

function useCancellableSWR<T>(key: Key, swrOptions?: SWRConfiguration): [SWRResponse<T>, AbortController] {
    const controller = new AbortController();

    return [
        useSWR<T>(key, (url) => axios.get(url, { signal: controller.signal }).then((res) => res.data), {
            ...swrOptions,
        }),
        controller,
    ];
}

export { useCancellableSWR };
