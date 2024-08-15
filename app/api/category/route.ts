import { connectToDB } from "@/utils/mongodb";
import Category from '@/models/category';
import { NextResponse } from 'next/server';


// Helper function to format the slug
const formatSlug = (slug: string) => {
    return slug.toLowerCase().replace(/\s+/g, '-');
};

export async function POST(req: Request){
    try{

        const { name, slug, status } = await req.json();

        // Validate input
        if (!name || !slug) {
            return NextResponse.json({ error: 'Name and slug are required.' }, { status: 400 });
        }

        await connectToDB();

       // Check if a category with the same slug already exists
       const formattedSlug = formatSlug(slug);
       const existCategory = await Category.findOne({ slug: formattedSlug });

        if (existCategory) {
            return NextResponse.json({ error: 'Category already exists with this slug.' }, { status: 400 });
        }

        // Create a new category
        const newCategory = new Category({
            name,
            slug: formattedSlug,
            status,
        });

        // Save the new category to the database
        await newCategory.save();

        // Return a success response
        return NextResponse.json({ message: 'Category has been created successfully.' }, { status: 201 });



    }catch (error) {
        console.error('Error in creating category:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}



