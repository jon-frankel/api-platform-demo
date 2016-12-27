<?php

namespace AppBundle\DataFixtures\ORM;


use AppBundle\Entity\Book;
use AppBundle\Entity\Review;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadReviewData extends AbstractFixture implements OrderedFixtureInterface
{

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        /** @var Book $book1 */
        $book1 = $this->getReference('book1');
        /** @var Book $book2 */
        $book2 = $this->getReference('book2');

        $review1 = new Review();
        $review1->setItemReviewed($book1);
        $review1->setRating(4);
        $review1->setReviewBody('I was thunderstruck.');

        $review2 = new Review();
        $review2->setItemReviewed($book1);
        $review2->setRating(3);
        $review2->setReviewBody('I loved it.');

        $review3 = new Review();
        $review3->setItemReviewed($book2);
        $review3->setRating(5);
        $review3->setReviewBody('I hated it, but have an upvote anyway.');

        $review4 = new Review();
        $review4->setItemReviewed($book2);
        $review4->setRating(2);
        $review4->setReviewBody('I am ashamed of reading this trash.');

        $manager->persist($review1);
        $manager->persist($review2);
        $manager->persist($review3);
        $manager->persist($review4);
        $manager->flush();
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 20;
    }
}