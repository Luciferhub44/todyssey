import { useCallback } from "react";
import { useConnect, useDisconnect, type Connector } from "wagmi";
import { connectorLocalStorageKey } from "./index";

const useAuth = () => {
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const login = useCallback(
    async (connectorId: string) => {
      const connector = connectors.find((c: Connector) => c.id === connectorId);
      if (!connector) {
        throw new Error("Connector not found");
      }
      
      try {
        const result = await connectAsync({ connector });
        localStorage.setItem(connectorLocalStorageKey, connectorId);
        return result;
      } catch (error) {
        console.error('Connection error:', error);
        throw error;
      }
    },
    [connectors, connectAsync]
  );

  const logout = useCallback(async () => {
    try {
      await disconnectAsync();
      localStorage.removeItem(connectorLocalStorageKey);
    } catch (error) {
      console.error(error);
    }
  }, [disconnectAsync]);

  return { logout, login };
};

export default useAuth;
