import { useCallback, useEffect, useRef } from "react";

import {
  CROSS_ANIMATION_MS,
  NORMAL_CROSS_PATH_A,
  NORMAL_CROSS_PATH_B,
} from "./heroMenu.constants";

import { clamp, easeOutCubic, getCrossPaths } from "./heroMenu.utils";

export function useCrossAnimation({
  crossGroupRef,
  crossPathARef,
  crossPathBRef,
}) {
  const crossFrameRef = useRef(null);

  const resetCross = useCallback(() => {
    if (crossGroupRef.current) {
      crossGroupRef.current.setAttribute(
        "transform",
        "translate(325 325) rotate(0)"
      );
    }

    if (crossPathARef.current) {
      crossPathARef.current.setAttribute("d", NORMAL_CROSS_PATH_A);
    }

    if (crossPathBRef.current) {
      crossPathBRef.current.setAttribute("d", NORMAL_CROSS_PATH_B);
    }
  }, [crossGroupRef, crossPathARef, crossPathBRef]);

  const stopCrossAnimation = useCallback(() => {
    if (crossFrameRef.current) {
      cancelAnimationFrame(crossFrameRef.current);
      crossFrameRef.current = null;
    }

    resetCross();
  }, [resetCross]);

  const startCrossAnimation = useCallback(() => {
    stopCrossAnimation();

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const rawProgress = clamp(elapsed / CROSS_ANIMATION_MS, 0, 1);
      const easedProgress = easeOutCubic(rawProgress);
      const rotation = easedProgress * 360;
      const { firstPath, secondPath } = getCrossPaths(rawProgress);

      if (crossGroupRef.current) {
        crossGroupRef.current.setAttribute(
          "transform",
          `translate(325 325) rotate(${rotation})`
        );
      }

      if (crossPathARef.current) {
        crossPathARef.current.setAttribute("d", firstPath);
      }

      if (crossPathBRef.current) {
        crossPathBRef.current.setAttribute("d", secondPath);
      }

      if (rawProgress < 1) {
        crossFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      resetCross();
      crossFrameRef.current = null;
    };

    crossFrameRef.current = requestAnimationFrame(animate);
  }, [
    crossGroupRef,
    crossPathARef,
    crossPathBRef,
    resetCross,
    stopCrossAnimation,
  ]);

  useEffect(() => {
    return () => {
      if (crossFrameRef.current) {
        cancelAnimationFrame(crossFrameRef.current);
      }
    };
  }, []);

  return {
    resetCross,
    stopCrossAnimation,
    startCrossAnimation,
  };
}