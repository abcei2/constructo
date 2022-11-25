
import { query,  getDocs, collection, doc, writeBatch, deleteDoc, getDoc, setDoc } from "firebase/firestore";

import { Category, EmployeeWage, ProdsProviders, Product, Project, Stage, StageCategory, StageProduct } from "../../types/dbTypes";
import db from "../firebase";

const PROJECTS_COLLECTION = "projects"
const CATEGORIES_COLLECTION = "categories"
const PRODUCTS_COLLECTION = "products"
const WAGES_COLLECTION = "wages"
const STAGES_COLLECTION = "stages"


const projectsCollection = collection(db, PROJECTS_COLLECTION)

export const saveProject = (
    projectRef:string,
    projectOwner:string,
    projectData?: Project ,
    categoriesData?: Array<Category>,
    productsProvidersData?: ProdsProviders,
    productData?:Array<Product>,
    wagesData?:Array<EmployeeWage>
) =>{

    if (!projectRef  || !projectData && !categoriesData && !productData && !wagesData) 
        return

    const batch = writeBatch(db);
    const pojectDoc = doc(projectsCollection, projectRef)
    
    if (projectData) {
        const newProjectData = productsProvidersData?
        {
            ...projectData,
            ...productsProvidersData,
            owner: projectOwner
        } : {
            ...projectData,
            owner: projectOwner
        }
        batch.set(pojectDoc, newProjectData, { merge: true });
    }
 

    if (categoriesData)
        categoriesData.forEach(
            categoryData => {
                const { ref, ...category } = categoryData
                const categoryDoc = doc(projectsCollection, projectRef, CATEGORIES_COLLECTION, ref )
                batch.set(categoryDoc, category, { merge:true } );
            }
        )

    if (productData)
        productData.forEach(
            productData => {
                const { ref, ...product } = productData
                const productDoc = doc(projectsCollection, projectRef, CATEGORIES_COLLECTION, product.category.ref, PRODUCTS_COLLECTION, ref)
                const { category, ...finalData } = product
                batch.set(productDoc, finalData, { merge: true });
            }
        )

    if (wagesData)
        wagesData.forEach(
            wageData => {
                const {ref, ...wage}=wageData
                const wageDoc = doc(projectsCollection, projectRef, WAGES_COLLECTION, ref)
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
export const getProjectData= async (projectRef: string) => {
    const projectDoc = doc(projectsCollection, projectRef)
    const categoriesSnap = await getDoc(projectDoc);
    return {
        ...categoriesSnap.data()
    }
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
export const getAllWages= async (projectRef: string) => {
    const wagesCollection = collection(projectsCollection, projectRef, WAGES_COLLECTION)
    const q = query(wagesCollection);
    const wagesSnap = await getDocs(q);
    return wagesSnap.docs.map((doc) => {
        return {
            ...doc.data(),
            ref: doc.id
        }
    });
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

export const deleteWage = async (projectRef: string, wageRef: string) => {

    await deleteDoc(doc(projectsCollection, projectRef, WAGES_COLLECTION, wageRef));
}


export const saveStageDB = async (
    projectRef: string,
    projectOwner: string,
    stageData:Stage
)=>{
    const {ref, ...stage} = stageData
    const stageProductsDoc = doc(projectsCollection, projectRef, STAGES_COLLECTION, ref)
    await setDoc(stageProductsDoc, stage)
}


export const saveStageCategoriesDB = (
    projectRef: string,
    projectOwner: string,
    stageRef: string,
    stageCategoriesData: Array<StageCategory>
) => {

    const batch = writeBatch(db);
    stageCategoriesData.map(
        (stageCategoryData) => {
            const { ref, ...stageCategory } = stageCategoryData
            const stageProductsDoc = doc(
                projectsCollection, projectRef, 
                STAGES_COLLECTION, stageRef, 
                CATEGORIES_COLLECTION, ref
            )
            batch.set(stageProductsDoc, stageCategory, { merge: true });

        }
    )
    batch.commit()


}


export const saveStageProductsDB = (
    projectRef: string,
    projectOwner: string,
    stageRef: string,
    stageCategoryRef:string,
    stageProductsData: Array<StageProduct>

) =>{

    const batch = writeBatch(db);

    stageProductsData.forEach(

        (stageProductData)=>{
            const { ref, ...stageProduct } = stageProductData
            const stageProductsDoc = doc(
                projectsCollection, projectRef, 
                STAGES_COLLECTION, stageRef,
                CATEGORIES_COLLECTION, stageCategoryRef, 
                PRODUCTS_COLLECTION, ref
            )

            batch.set(stageProductsDoc, stageProduct, { merge: true });
        }
    )


    batch.commit()

}
export const getAllStages = async (projectRef: string) => {
    const collectionObj = collection(projectsCollection, projectRef, STAGES_COLLECTION)
    
    const q = query(collectionObj);
    const snap = await getDocs(q);
    return snap.docs.map((doc) => {
        return {
            ...doc.data(),
            ref: doc.id
        }
    });
}

export const getAllStageProducts = async (projectRef: string, stageRef:string, categoryRef: string) => {
    const collectionObj = collection(projectsCollection, projectRef, STAGES_COLLECTION, stageRef, CATEGORIES_COLLECTION, categoryRef, PRODUCTS_COLLECTION)

    const q = query(collectionObj);
    const snap = await getDocs(q);
    return snap.docs.map((doc) => {
        return {
            ...doc.data(),
            ref: doc.id
        }
    });
}

export const getAllStageCategories = async (projectRef: string, stageRef: string) => {
    const collectionObj = collection(projectsCollection, projectRef, STAGES_COLLECTION, stageRef, CATEGORIES_COLLECTION)

    const q = query(collectionObj);
    const snap = await getDocs(q);
    return snap.docs.map((doc) => {
        return {
            ...doc.data(),
            ref: doc.id
        }
    });
}