"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { cn } from "@/lib/utils";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.2", "end 0.8"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div
      className="w-full bg-gradient-to-b from-background to-background/80 font-sans"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <TextShimmer
            as="h1"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
            duration={2.5}
          >
            Нашата история
          </TextShimmer>
          <p className="text-lg md:text-xl text-muted-foreground">
            Вижте как се развива нашата компания през годините и какво постигнахме заедно.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:pt-24 md:gap-16 lg:gap-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[200px] lg:w-[300px]">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background dark:bg-black flex items-center justify-center">
                <motion.div 
                  className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
              </div>
              <TextShimmer 
                as="h1"
                className={cn(
                  "hidden md:block text-xl md:pl-20 md:text-3xl lg:text-4xl font-bold",
                  "text-neutral-500 dark:text-neutral-500",
                  "[--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
                )}
                duration={2.5}
              >
                {item.title}
              </TextShimmer>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 flex-1 max-w-[800px]">
              <TextShimmer 
                as="h1"
                className={cn(
                  "md:hidden block text-2xl mb-8 text-left font-bold",
                  "text-neutral-500 dark:text-neutral-500",
                  "[--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
                )}
                duration={2.5}
              >
                {item.title}
              </TextShimmer>
              {item.content}
            </div>
          </motion.div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-red-500 via-red-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}; 