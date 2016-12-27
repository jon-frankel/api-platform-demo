<?php

namespace AppBundle\DataFixtures\ORM;


use AppBundle\Entity\Book;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadBookData extends AbstractFixture implements OrderedFixtureInterface
{

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $book1 = new Book();
        $book1->setAuthor('Humphrey Stevenson');
        $book1->setName('A Book to Die For');
        $book1->setDescription('An intimate look in to book writing.');
        $book1->setDateCreated(new \DateTime('last year'));
        $book1->setIsbn('978-0-201-10179-9');

        $book2 = new Book();
        $book2->setAuthor('Oscar Grouch');
        $book2->setName('Dumpster Diving and Love');
        $book2->setDescription('Learn the lost art of dumpster diving.');
        $book2->setDateCreated(new \DateTime('2 years ago'));
        $book2->setIsbn('903-0-451-10112-3');

        $manager->persist($book1);
        $manager->persist($book2);
        $manager->flush();
        $this->addReference('book1', $book1);
        $this->addReference('book2', $book2);
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 10;
    }
}