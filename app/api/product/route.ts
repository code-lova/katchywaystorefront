import { connectToDB } from "@/utils/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


// Helper function to format the slug
const formatSlug = (slug: string) => {
    return slug.toLowerCase().replace(/\s+/g, '-');
};
