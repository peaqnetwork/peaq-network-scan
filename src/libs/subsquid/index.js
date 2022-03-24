import axios from "axios";
import config from "../../config";

const subSquidQuery = axios.create({
  baseURL: config.SUBSQUID_ARCHIVE_GRAPH_NODE,
});

export { subSquidQuery };
