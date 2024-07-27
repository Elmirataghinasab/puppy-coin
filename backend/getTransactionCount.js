import axios from "axios";

export const getTransactionCount = async (walletAddress) => {
  try {
    const url = `https://api.basescan.org/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=KPFCI7BK8FAHRBEQCVANM7HJ5TMDCAV72D`;
    console.log(url);
    const response = await axios.get(url);

    if (response.data.status === "1") {
      const transactions = response.data.result;
      return transactions.length;
    } else {
      console.error("Error fetching transactions:", response.data.message);
      return 0;
    }
  } catch (error) {
    console.error("Error:", error);
    return 0;
  }
};

export const getRewardRange = async (transactionCount) => {
  if (transactionCount == 0) {
    return 0;
  } else if (transactionCount > 0 && transactionCount < 100) {
    return 250000;
  } else if (transactionCount >= 100 && transactionCount < 500) {
    return 1000000;
  } else if (transactionCount >= 500 && transactionCount < 1000) {
    return 3000000;
  } else if (transactionCount >= 1000 && transactionCount < 10000) {
    return 10000000;
  } else if (transactionCount >= 10000) {
    return 50000000;
  }
};