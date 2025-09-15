import { TCategory } from "@/data/categories";
import clsx from "clsx";
import { FC } from "react";
import CardCategory1 from "./CategoryCards/CardCategory1";
import WidgetHeading from "./WidgetHeading";
import CardArticle1 from "./ArticleCards/CardArticle1";

interface Props {
  className?: string;
  categories: any;
}

const WidgetCategories: FC<Props> = ({
  className = "bg-white dark:bg-[#0D0D0D]",
  categories,
}) => {
  const shouldScroll = categories && categories.length > 6;

  return (
    <div
      className={clsx(
        "widget-categories overflow-hidden rounded-3xl",
        className
      )}
    >
      <WidgetHeading
        title="Continues Read"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flow-root">
        <div
          className={clsx(
            "grid pb-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-1",
            shouldScroll
              ? "overflow-y-auto max-h-[70vh] md:max-h-[90vh] pb-4 grid grid-cols-2"
              : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2"
          )}
        >
          {categories?.map((category: any, index: number) => (
            <CardArticle1
              key={category._id}
              article={category}
              className="p-4"
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories;
