"use client"
// import { motion } from "framer-motion"
import React from "react"
const BlogHeader = () => {
  // const headAnimation = {
  //   hidden: { y: 0, opacity: 0 },
  //   visible: { y: 0, opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
  // }

  return (
    <div>
      {/* <motion.div initial="hidden" animate="visible" variants={headAnimation}>
        <h1 className="pt-10 text-center text-4xl font-bold">Worker AI Blog</h1>
      </motion.div> */}
      <div>
        <h1 className="pt-10 text-center text-4xl font-bold">Worker AI Blog</h1>
      </div>
    </div>
  )
}

export default BlogHeader
