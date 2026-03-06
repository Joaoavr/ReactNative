import { FilterStatus } from "@/types/FilterStatus";

import { CircleDashed,CircleCheck} from "lucide-react-native";

export function StatusIcon({status}:{status:FilterStatus}) {
    return status === FilterStatus.Done ? (<CircleCheck size={18} color="#000" />) : (<CircleDashed size={18} color="#000" />);
}