
import { query, where, getDocs, collection, addDoc, runTransaction, doc, writeBatch, deleteDoc, updateDoc, DocumentReference, DocumentData, CollectionReference } from "firebase/firestore";
import { type } from "os";
import uuid from "react-uuid";
import { Category, EmployeeWage, Product, Project } from "../../types/dbTypes";
import db from "../firebase";

const PROJECTS_COLLECTION = "projects"
const CATEGORIES_COLLECTION = "categories"
const PRODUCTS_COLLECTION = "products"
const WAGES_COLLECTION = "wages"


const projectsCollection = collection(db, PROJECTS_COLLECTION)

export const saveProject = (
    saveProjData:boolean, 
    projectData: Project ,
    categoriesData?: Array<Category>,
    productData?:Array<Product>,
    wagesData?:Array<EmployeeWage>    
) =>{

    if (!saveProjData && !categoriesData && !productData) 
        return

    const batch = writeBatch(db);

    if (saveProjData) {
        const { ref:pRef, ...project } = projectData
        const pojectDoc = doc(projectsCollection, pRef)
        batch.set(pojectDoc, project, { merge: true });
    }

    if (categoriesData)
        categoriesData.map(
            categoryData => {
                const { ref, ...category } = categoryData
                const categoryDoc = doc(projectsCollection, projectData.ref, CATEGORIES_COLLECTION, ref )
                batch.set(categoryDoc, category, { merge:true } );
            }
        )

    if (productData)
        productData.map(
            productData => {
                const { ref, ...product } = productData
                const productDoc = doc(projectsCollection, projectData.ref, CATEGORIES_COLLECTION, product.category.ref, PRODUCTS_COLLECTION, ref)
                const { category, ...finalData } = product
                batch.set(productDoc, finalData, { merge: true });
            }
        )

    if (wagesData)
        wagesData.map(
            wageData => {
                const {ref, ...wage}=wageData
                const wageDoc = doc(projectsCollection, projectData.ref, WAGES_COLLECTION, ref)
                batch.set(wageDoc, wage, { merge: true });
            }
        )
    batch.commit();
}

export const getAllProjects = async () => {
    const q = query(projectsCollection);
    const projectSnap = await getDocs(q);
    return projectSnap.docs.map((doc) => {
        return {
            ...doc.data(),
            ref:doc.id
        }
    });
}

export const getAllCategories = async (projectRef: string) => {
    const categoriesCollection = collection(projectsCollection, projectRef, CATEGORIES_COLLECTION)
    const q = query(categoriesCollection);
    const categoriesSnap = await getDocs(q);
    return categoriesSnap.docs.map((doc) => {
        return {
            ...doc.data(),
            ref: doc.id
        }
    } );
}

export const getAllProducts= async (projectRef: string, categoryRef:string) => {
    const productsCollection = collection(projectsCollection, projectRef, CATEGORIES_COLLECTION, categoryRef, PRODUCTS_COLLECTION)
   
    const q = query(productsCollection);
    const productsSnap = await getDocs(q);
    return productsSnap.docs.map((doc) => {
        return {
            ...doc.data(),
            ref: doc.id
        }
    });
}

export const deleteProduct = async (projectRef: string, categoryRef: string, productRef:string) =>{

    await deleteDoc(doc(projectsCollection, projectRef, CATEGORIES_COLLECTION,categoryRef,PRODUCTS_COLLECTION,productRef));
}