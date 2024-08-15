import { connectToDB } from "@/utils/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


// Helper function to format the slug
const formatSlug = (slug: string) => {
    return slug.toLowerCase().replace(/\s+/g, '-');
};


export async function GET(req:Request, { params }: { params: {id: string }}) {
    try{

        await connectToDB()

        const { id } = params;

        if(!ObjectId.isValid(id)){
            return NextResponse.json(
                { message: "Invalid object ID"},
                { status: 400 }
            )
        }

        const selectedCategory = await Category.findById(id)

        if(!selectedCategory){
            return NextResponse.json(
                { message: "Category Not Found"},
                { status: 404}
            )
        }

        return NextResponse.json(selectedCategory);


    }catch(error){
        console.error('Error in fetching category:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}



export async function PUT(req:Request, { params }: {params: { id: string }}) {

    try{

        await connectToDB();

        const { id } = params;

        if(!ObjectId.isValid(id)){
            return NextResponse.json(
                {message: "Invalid Object ID"},
                {status: 400 }
            )
        }

        const body = await req.json();
        const { name, slug, status } = body;

        if(!name || !slug || !status ){
            return NextResponse.json(
                {message: "Name and slug is required"},
                {status: 400 }
            )
        }

        const formattedSlug = formatSlug(slug);

        const updatedCategory = await Category.findByIdAndUpdate(id, 
            { name, slug:formattedSlug , status },
            { new: true, runValidators: true}
        )

        if(!updatedCategory){
            return NextResponse.json(
                { message: " category not found"},
                { status: 404}
            )
        }

        return NextResponse.json({message: "Category Updated Successfully"}, { status: 200});



    }catch(error){
        console.error('Error in Updating category:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
    
}



export async function DELETE(req:Request, { params }: {params: { id: string }}) {

    try{

        await connectToDB();

        const { id } = params;

        if(!ObjectId.isValid(id)){
            return NextResponse.json(
                {message: "Invalid Object ID"},
                {status: 400 }
            )
        }

        const deletedCategory = await Category.findByIdAndDelete(id)

        if(!deletedCategory){
            return NextResponse.json(
                { message: " Category not found"},
                { status: 404}
            )
        }

        return NextResponse.json({message: "Category Deleted Successfully"}, { status: 200});



    }catch(error){
        console.error('Error deleting category:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
    
}