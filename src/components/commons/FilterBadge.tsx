import { Badge, BadgeIcon, BadgeText } from "../ui/badge";
import { CloseIcon } from "../ui/icon";

const FilterBadge: React.FC<{
  label: string;
  onRemove: () => void;
}> = ({ label, onRemove }) => {
  return (
    <Badge size="md">
      <BadgeText>{label}</BadgeText>
      <BadgeIcon as={CloseIcon} size="sm" onPress={onRemove} />
    </Badge>
  );
};

export default FilterBadge;
